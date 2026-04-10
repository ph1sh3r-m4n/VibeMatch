export const fetchEvents = async (mood?: string | null) => {
  const url = mood ? `/api/events?mood=${encodeURIComponent(mood)}` : '/api/events';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

export const fetchEventById = async (id: string | number) => {
  const res = await fetch(`/api/events/${id}`);
  if (!res.ok) throw new Error('Failed to fetch event');
  return res.json();
};

export const createEvent = async (eventData: any, token: string) => {
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(eventData),
  });
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
};

export const fetchMessages = async (eventId: string | number) => {
  const res = await fetch(`/api/events/${eventId}/messages`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
};
