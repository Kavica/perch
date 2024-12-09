const createRequestPurchasePage = () =>{
    const mainContent = document.querySelector('#mainContent')
    let page = new PurchaseRequestPage()
    mainContent.appendChild(page.HTMLElement)
    page.insertDropdowns()
}

const submitNewPurchase = async () =>{
    // console.log(inputGroup.values)
    let data = inputGroup.values
    //q9.querySelector('input:checked')
    // console.log(document.querySelector('input[name="paymentTypes"]:checked').value)
    // console.log(document.querySelector('input[name="pORequest"]:checked').value)

    data["divisionId"] = 1
    data["purchaseTypeId"] = 1
    data["statusId"] = 1
    data["purchaseOrderId"] = 1
    data["paymentTypeId"] = 1
    data["totalCost"] = 9999
    data["creditCard"] = true
    data["purchaseDate"] = "2024-08-09"
    data["statusDate"] = "2024-10-01"
    data['requesterESN'] = 103518

    console.log(data)
    const dataURL = '../json/purchases.php'
    await JSONRequest('POST', dataURL, JSON.stringify(data))

}

class PurchaseRequestPage{
    constructor(loadedData){
        this._UUID = createUUID(this)
        this._data = loadedData ? loadedData : null
        this._inputGroupUUIDs = []
        this._dropDowns = {}
        this._html = this.createHTML()  
    }

    get HTMLElement(){
        return this._html
    }

    insertDropdowns(){
        const keys = Object.keys(this._dropDowns)
        for(const key of keys){
            let dd = new Dropdown(this._dropDowns[key].location, "nodata", true)
            dd.setJSONData(this._dropDowns[key].data)
            dd.delayedInit()
            dd.setMode('single')
            dd.setTitle('Make Selection')
            dd.setDefaultTitle('Make Selection')
            dd.setColors("#ef767a", "#696773")
            dd.setTextColor("#080705")
            dd.setLimit(10)

            this._dropDowns[key].ref = dd
        }

    }

    createHTML(){
        const children = []

        children.push(createPageTitle('Request For Purchase'))

        children.push(this.purchaseDatesAndType())

        children.push(this.requestorInfo())

        const page = {
            type: 'div',
            class: 'page',
            children: children
        }

        return createHTMLElement(page)
    }

    purchaseDatesAndType(){
        const children = []

        children.push(this.typeYearControl())

        const html = {
            type: 'div',
            class: 'section vertical',
            children: children
        }

        return createHTMLElement(html)
    }

    typeYearControl(){
        const children = []

        children.push(this.dropdownWithLabel('Purchase Type:', 'purchaseTypeDDWrapper', 'purchaseType', purchaseTypes.type))
        children.push(this.dropdownWithLabel('Fiscal Year:', 'fiscalYearDDWrapper', 'fiscalYear', fiscalYear.year))

        let controlNumber = new Util_Input('Control Number:', 'controlNumber', null, null)
        children.push(controlNumber.HTMLElement)
        this._inputGroupUUIDs.push(controlNumber.uuid)

        let requestDate = new Util_Input('Request Date:', 'requestDate', null, null)
        children.push(requestDate.HTMLElement)
        this._inputGroupUUIDs.push(requestDate.uuid)
        
        const html = {
            type: 'div',
            class: 'section horizontal',
            children: children
        }

        return createHTMLElement(html)
    }

    requestorInfo(){
        const children = []

        children.push(this.divisionRequestorState())

        const html = {
            type: 'div',
            class: 'section vertical',
            children: children
        }

        return createHTMLElement(html)
    }

    divisionRequestorState(){
        const children = []

        children.push(this.dropdownWithLabel('Division:', 'divisionDDWrapper', 'requestingDivision', requestingDivision.division))

        children.push(this.dropdownWithLabel('Requestor:', 'requestorDDWrapper', 'requestingEmployee', employees.employees))

        let stateAPD = new Util_Input('State APD Number:', 'stateAPD', null, null)
        children.push(stateAPD.HTMLElement)
        this._inputGroupUUIDs.push(stateAPD.uuid)
        
        const html = {
            type: 'div',
            class: 'section horizontal',
            children: children
        }

        return createHTMLElement(html)
    }

    dropdownWithLabel(label, location, key, data){
        this._dropDowns[key] = {location, data}
        const children = []
    
        const ddLabel = {
            type: 'div', 
            class: 'ddLabel', 
            innerText: label
        }
        children.push(createHTMLElement(ddLabel))
    
        const ddWrapper = {
            type: 'div',
            class: 'ddWrapper', 
            id: location
        }
        children.push(createHTMLElement(ddWrapper))
    
        const ddAndLabelWrapper = {
            type: 'div',
            class: 'ddAndLabelWrapper vertical',
            children: children
        }
        return createHTMLElement(ddAndLabelWrapper)
    }
}




// Fields that we still need 
// purchase type - EPD, telecom, non-edp
//fiscal year - a drop down
//control number, but we will auto-fill this. Not editable, probs
// Date, defaults to today, but maybe editable for back-dating? 
//division, this might get broken into two, division and program
//requestor, this will pull from the roster (possible option to name a non-CSA employee)
//State APD, they will need to enter this. 
//Other info and disposition would probably combine to a generic nots field. Not a blank text area, but a button to append a note. 
//Vendor, pulled from our data at the very least, possibly editable down the road
//Order title, some way to name the purchase.
//Estimated cost will not be a field. Probably autofill with the line items. 
//Payment type, radio button or drop down. 
//We do not need the PO request box. 
//PO order, we will see. Serinos will look into this and get back to me
//item number is probably just an auto number
//the rest of the line items are needed
//coding strip does not need to be on the purchase request, that will come later with Christina. 
//purchase history might not be needed at all times. Perhaps buried in a menu. 
