import serialize from 'form-serialize';

class IsDirty {
    constructor() {
        // set defaults
        this._targets = [];
        this._forms = [];
        this._starting = [];
    }

    init(targets = []) {
        if (targets == null || targets.length === 0) {
            throw new Error("No targets supplied");
        }
        if (!Array.isArray(targets)) {
            targets = [targets];
        }

        for (let target of targets) {
            let element = document.querySelector(target);
            if (element == null) {
                throw new Error("Invalid query selector supplied");
            }
            const currentElementIndex = this._targets.length;

            this._targets.push(target);
            this._forms.push(element);
            this._starting.push(serialize(element, { hash: true }));

            element.dataset['isDirty'] = `${currentElementIndex}`;
        }
    }

    isDirty(form) {
        if (form == null || (form != null && form.dataset['isDirty'] == null)) {
            throw new Error("Invalid form supplied");
        }

        const starting = this._starting[form.dataset['isDirty']];
        // fast compare should be enough
        return JSON.stringify(starting) !== JSON.stringify(serialize(form, { hash: true }));
    }

    isDirtyBySelector(form, selector) {
        if (form == null || (form != null && form.dataset['isDirty'] == null)) {
            throw new Error("Invalid form supplied");
        }
        if (selector == null || selector.length === 0) {
            throw new Error("Invalid selector supplied");
        }

        const starting = this._starting[form.dataset['isDirty']];
        const element = form.querySelector(selector);
        if (element == null) {
            throw new Error("Selector gave no result.");
        }

        // fast compare should be enough
        return JSON.stringify(starting) !== JSON.stringify(serialize(form, { hash: true }));
    }
}

export default IsDirty;