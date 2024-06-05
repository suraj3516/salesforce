import { LightningElement, api, track } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api messageparent;
    @track childMessage = '';

    handleInputChange(event) {
        this.childMessage = event.target.value;
    }

    handleButtonClickRefresh() {
        const message = 'Refresh';
        const customEvent = new CustomEvent('messageupdate', {
            detail: message
        });
        this.dispatchEvent(customEvent);
    }
    handleButtonClickEdit() {
        const message = 'Edit';
        const customEvent = new CustomEvent('messageupdate', {
            detail: message
        });
        this.dispatchEvent(customEvent);
    }
    handleButtonClickSave() {
        const message = 'Save';
        const customEvent = new CustomEvent('messageupdate', {
            detail: message
        });
        this.dispatchEvent(customEvent);
    }
}
