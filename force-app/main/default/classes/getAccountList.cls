public with sharing class getAccountList {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Phone, Type, OwnerId, SLAExpirationDate__c FROM Account];
    }
    @AuraEnabled
    public static void updateAccounts(List<Account> data) {
        update data;
    }
}