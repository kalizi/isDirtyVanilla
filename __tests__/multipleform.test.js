/**
 * @jest-environment jsdom
 */
import IsDirty from '../src/IsDirty';

test('can track multiple forms', () => {
    document.body.innerHTML = `
        <form id="simpleform1">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
        <form id="simpleform2">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
    `;

    const dirtyChecker = new IsDirty();
    dirtyChecker.init(['#simpleform1', '#simpleform2']);

    // Check dirty checker index attached to dataset
    const formElement = document.body.querySelector("#simpleform1");
    expect(formElement.dataset['isDirty']).toBe('0');

    const otherFormElement = document.body.querySelector("#simpleform2");
    expect(otherFormElement.dataset['isDirty']).toBe('1');

    // Change a form element input
    const inputElement = otherFormElement.querySelector("input[name='name']");
    inputElement.value = 'John Smith';

    expect(dirtyChecker.isDirty(formElement)).toBe(false);
    expect(dirtyChecker.isDirty(otherFormElement)).toBe(true);

    const firstInputElement = formElement.querySelector("input[name='name']");
    firstInputElement.value = 'John Smith';
    expect(dirtyChecker.isDirty(formElement)).toBe(true);
    expect(dirtyChecker.isDirty(otherFormElement)).toBe(true);
});
