export const BASE = (process.env.NODE_ENV === 'development') ? 'http://localhost:8000/api/v1/projects/1/' : (process.env.REACT_APP_URL_API + 'api/v1/projects/1/');

export const UTTER_URL = BASE + "utters/";
export const STORY_URL = BASE + "stories/";
export const INTENT_URL = BASE + "intents/";