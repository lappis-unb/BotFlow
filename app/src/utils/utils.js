export const isButtonEnabled = (content, old_content, name, old_name, helper_text = '', no_empty_fields) => {
    const name_changed = (name !== old_name);
    const content_changed = JSON.stringify(content) !== JSON.stringify(old_content);
    const have_changes = (content_changed || name_changed);

    const no_errors = helper_text.length === 0;
    const no_empty_name = name.length !== 0;

    return (
        no_errors &&
        have_changes &&
        no_empty_name &&
        no_empty_fields
    );
}
