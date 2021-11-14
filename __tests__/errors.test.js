/**
 * @jest-environment jsdom
 */
import IsDirty from '../src/IsDirty';

test('cannot initialize isDirty with no element', () => {
    const dirty = new IsDirty();
    expect(() => dirty.init(null)).toThrow("No targets supplied");
    expect(() => dirty.init()).toThrow("No targets supplied");
});

test('cannot initialize if invalid form selector provided', () => {
    document.body.innerHTML = `
        <form id="simpleform">
        </form>
    `;

    const dirty = new IsDirty();
    // give class selector instead of id
    expect(() => { dirty.init(['.simpleform']) }).toThrow("Invalid query selector supplied");
});
 
test('errors thrown if invalid parameters are provided', () => {
    document.body.innerHTML = `
        <form id="simpleform">
            <input type="text" name="name" value="John Doe" />
            <input type="text" name="email" value=""/>
        </form>
    `;

    const dirtyChecker = new IsDirty();
    dirtyChecker.init(['#simpleform']);
    const formElement = document.querySelector('#simpleform');

    expect(() => { dirtyChecker.isDirty(null) }).toThrow("Invalid form supplied");
    expect(() => { dirtyChecker.isDirtyBySelector(null, 'input[name="name"]') }).toThrow("Invalid form supplied");
    expect(() => { dirtyChecker.isDirtyBySelector(formElement, null) }).toThrow("Invalid selector supplied");
    expect(() => { dirtyChecker.isDirtyBySelector(formElement, '') }).toThrow("Invalid selector supplied");
    expect(() => { dirtyChecker.isDirtyBySelector(formElement, 'age') }).toThrow("elector gave no result.");
});
