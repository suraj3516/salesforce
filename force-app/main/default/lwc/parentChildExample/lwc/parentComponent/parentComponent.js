import { LightningElement, track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track parentMessage = '';
    @track receivedMessage = '';

    handleClickRefresh() {
        this.parentMessage = 'Refresh';
    }
    handleClickEdit() {
        this.parentMessage = 'Edit';
    }
    handleClickSave() {
        this.parentMessage = 'Save';
    }

    handleMessageUpdate(event) {
        this.receivedMessage = event.detail;
    }
}
