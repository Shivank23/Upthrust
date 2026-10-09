import { DataLayerEvent } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// In-memory event log for the live visual inspector
const gtmEventSubscribers: Array<(events: DataLayerEvent[]) => void> = [];
const localEventLog: DataLayerEvent[] = [];

/**
 * Pushes an event to the Google Tag Manager dataLayer
 * and notifies any active debug inspectors.
 */
export function pushToDataLayer(event: string, payload: Record<string, any> = {}): DataLayerEvent {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    const eventObject = {
      event,
      timestamp: new Date().toISOString(),
      ...payload,
    };

    window.dataLayer.push(eventObject);

    const recordedEvent: DataLayerEvent = {
      id: `gtm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleTimeString(),
      event,
      payload: eventObject,
    };

    localEventLog.unshift(recordedEvent);
    if (localEventLog.length > 50) {
      localEventLog.pop();
    }

    notifySubscribers();
    return recordedEvent;
  }

  return {
    id: 'mock',
    timestamp: new Date().toLocaleTimeString(),
    event,
    payload,
  };
}

/**
 * Specifically triggers the required `form_submit` event
 */
export function trackFormSubmission(formType: 'contact' | 'newsletter', formData: Record<string, any>) {
  return pushToDataLayer('form_submit', {
    form_type: formType,
    page_location: window.location.href,
    page_title: document.title,
    user_data: {
      email_domain: formData.email ? formData.email.split('@')[1] : undefined,
      service_interest: formData.service || 'newsletter',
    },
    conversion_time: new Date().toISOString(),
  });
}

export function subscribeToGTM(callback: (events: DataLayerEvent[]) => void) {
  gtmEventSubscribers.push(callback);
  callback([...localEventLog]);

  return () => {
    const index = gtmEventSubscribers.indexOf(callback);
    if (index > -1) {
      gtmEventSubscribers.splice(index, 1);
    }
  };
}

function notifySubscribers() {
  gtmEventSubscribers.forEach((cb) => cb([...localEventLog]));
}

export function getRecordedGTMEvents(): DataLayerEvent[] {
  return [...localEventLog];
}
