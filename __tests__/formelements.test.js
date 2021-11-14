/**
 * @jest-environment jsdom
 */
 import IsDirty from '../src/IsDirty';

test('can check if select is dirty', () => {
    document.body.innerHTML = `
        <form id="simpleform">
            <select name="age">
                <option value="-1" disabled selected>Select your age</option>
                <option value="1">18-24</option>
                <option value="2">25-30</option>
            </select>
        </form>
    `;

    const dirtyChecker = new IsDirty();
    dirtyChecker.init(['#simpleform']);

    // Change select value
    const select = document.querySelector('#simpleform select[name="age"]');
    select.value = '1';

    // Check isDirty works by passing form
    const formElement = document.body.querySelector("#simpleform");
    expect(dirtyChecker.isDirty(formElement)).toBe(true);
});
