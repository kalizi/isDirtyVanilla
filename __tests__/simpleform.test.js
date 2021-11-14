/**
 * @jest-environment jsdom
 */
import IsDirty from '../src/IsDirty';

test('unedited form is not dirty', () => {
    document.body.innerHTML = `
        <form id="simpleform">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
    `;

    const dirtyChecker = new IsDirty();
    dirtyChecker.init('#simpleform');

    // Check dirty checker index attached to dataset
    const formElement = document.body.querySelector("#simpleform");
    expect(formElement.dataset['isDirty']).toBe('0');

    expect(dirtyChecker.isDirty(formElement)).toBe(false);
});

test('edited form is dirty using form element', () => {
    document.body.innerHTML = `
        <form id="simpleform">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
    `;
    
    const dirtyChecker = new IsDirty();
    dirtyChecker.init(['#simpleform']);

    const input = document.querySelector('#simpleform input[name="name"]');
    input.value = 'Jane Doe';

    // Check isDirty works by passing form
    const formElement = document.body.querySelector("#simpleform");
    expect(dirtyChecker.isDirty(formElement)).toBe(true);
});

test('edited form input is dirty using selector', () => {
    document.body.innerHTML = `
        <form id="simpleform">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
    `;

    const dirtyChecker = new IsDirty();
    dirtyChecker.init(['#simpleform']);

    const selector = '#simpleform input[name="name"]';
    const input = document.querySelector(selector);
    input.value = 'Jane Doe';

    const formElement = document.body.querySelector("#simpleform");

    expect(dirtyChecker.isDirtyBySelector(formElement, 'input[name="name"]')).toBe(true);
});

test('can change and reset form and keep dirty to false', () => {
    document.body.innerHTML = `
        <form id="simpleform">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
    `;

    const dirtyChecker = new IsDirty();
    dirtyChecker.init('#simpleform');
    
    const formElement = document.body.querySelector("#simpleform");
    // Change input to check that form is dirty
    const input = document.querySelector('#simpleform input[name="name"]');
    input.value = 'Jane Doe';

    expect(dirtyChecker.isDirty(formElement)).toBe(true);

    // Reset input
    input.value = 'John Doe';
    // Check form was reset
    expect(dirtyChecker.isDirty(formElement)).toBe(false);
});