import { LightningElement, wire, track } from 'lwc';
import generateData from './generateData';
import getAccountList from '@salesforce/apex/getAccountList.getAccountList';
import updateAccounts from '@salesforce/apex/getAccountList.updateAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import picklistColumn from './picklistColumn.html';
import picklistStatic from './picklistStatic.html'
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';


const columns = [
    { label: 'Account Name', fieldName: 'Name', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    {
        label: 'Type', fieldName: 'Type', type: 'picklistColumn', editable: true, typeAttributes: {
            placeholder: 'Choose Type', options: { fieldName: 'pickListOptions' }, 
            value: { fieldName: 'Type' }, // default value for picklist,
            context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
        }
    },
    { label: 'Account Owner', fieldName: 'OwnerId', editable: false,displayReadOnlyIcon: true },
    { label: 'SLA Expiration Date', fieldName: 'SLAExpirationDate__c', type: 'date', editable: true, 
    typeAttributes:{
        weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit"
    }
     },
];
export default class DataTableInlineEditingComponent extends LightningElement {
     accounts;
    @track draftValues = [];
    columns = columns;
    rowOffset = 0;
    @track pickListOptions;

    static customTypes = {
        picklistColumn: {
            template: picklistStatic,
            editTemplate: picklistColumn,
            standardCellLayout: true,
            typeAttributes: ['label', 'placeholder', 'options', 'value', 'context', 'variant','name']
        }
    };

    //fetch picklist options
    @wire(getPicklistValues, {
        recordTypeId: "$objectInfo.data.defaultRecordTypeId",
        fieldApiName: TYPE_FIELD
    })
    wirePickList({ error, data }) {
        if (data) {
            this.pickListOptions = data.values;
        } else if (error) {
            console.log(error);
        }
    }

    @wire(getAccountList)
    accounts

    handleSave(event) {
        const updatedFields = event.detail.draftValues;
        console.log(updatedFields);
        updateAccounts({ data: updatedFields })
            .then(() => {
                this.showToast('Success', 'Accounts updated successfully', 'success');
                this.draftValues = [];
                return refreshApex(this.accounts);
            })
            .catch(error => {
                this.showToast('Error', 'Error updating accounts', error);
            });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }
}