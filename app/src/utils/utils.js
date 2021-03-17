import React from 'react';

export const isButtonEnabled = (content, old_content, name, old_name, helper_text = '', no_empty_fields) => {
  const name_changed = (name !== old_name);
  const content_changed = JSON.stringify(content) !== JSON.stringify(old_content);
  const have_changes = (content_changed || name_changed);

  const no_errors = helper_text.length === 0;
  const no_empty_name = name.length !== 0;

  return (
    no_errors
        && have_changes
        && no_empty_name
        && no_empty_fields
  );
};

export const setHighlight = (name, highlighted_text) => {
  const texts = name.replace(highlighted_text, ` ${highlighted_text} `).split(' ');

  return texts.map((text, index) => (
    (text === highlighted_text) ? <span key={`${index}filter_text`} style={{ color: '#f15035' }}>{text}</span> : text
  ));
};

export function clone(obj) {
  if (obj == null || typeof obj !== 'object') return obj;
  const copy = obj.constructor();
  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}
