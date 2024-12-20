class NothingToSeeHere{
    constructor(message){
        this._message = message
        this._html = this.createHTML()
    }

    get HTMLElement(){
        return this._html
    }

    createHTML(){
        const children = []
        let messageWrapper = {
            type: 'div',
            class: 'nothingToSeeHere', 
            innerText: this._message
        }
        children.push(createHTMLElement(messageWrapper))

        const html = {
            type: 'div',
            class: 'messageFlexWrapper appear',
            children: children
        }

        return createHTMLElement(html)
    }
}

class Dashboard{
    constructor(){
        this._html = this.createHTML()
    }

    get HTMLElement(){
        return this._html
    }

    createHTML(){
        const children = []
        
        children.push(this.createLeftColumn())

        children.push(this.createRightColumn())

        const html = {
            type: 'div',
            class: 'dashboardWrapper appear',
            children: children
        }

        return createHTMLElement(html)
    }

    createLeftColumn(){
        const children = []

        let item = new DashboardItem('Start New Purchase', 'plus', 'new')
        children.push(item.HTMLElement)

        children.push(this.colorSection())

        const wip1 = new DashboardWIP()
        children.push(wip1.HTMLElement)

        const wip2 = new DashboardWIP()
        children.push(wip2.HTMLElement)

        const html = {
            type: 'div',
            class: 'dashboardLeftColumn',
            children: children
        }
        return createHTMLElement(html)
    }

    colorSection(){
        const children = []

        children.push(this.createOrange())
        children.push(this.createPurple())
        children.push(this.createGreen())

        const html = {
            type: 'div',
            class: 'colorSection',
            children: children
        }
        return createHTMLElement(html)
    }

    createOrange(){
        const children = []

        const text = {
            type: 'div',
            class: 'colorSectionText',
            innerText: 'Some Placeholder Text Here'
        }
        children.push(createHTMLElement(text))

        const box = {
            type: 'div',
            class: 'colorSectionBox',
            innerText: '10'
        }
        children.push(createHTMLElement(box))

        const html = {
            type: 'div', 
            class: 'dashboardOrangeWrapper shadow colorSectionItem',
            children: children
        }
        return createHTMLElement(html)
    }

    createPurple(){
        const children = []

        const text = {
            type: 'div',
            class: 'colorSectionText',
            innerText: 'Some Placeholder Text Here'
        }
        children.push(createHTMLElement(text))

        const box = {
            type: 'div',
            class: 'colorSectionBox',
            innerText: '17'
        }
        children.push(createHTMLElement(box))

        const html = {
            type: 'div', 
            class: 'dashboardPurpleWrapper shadow colorSectionItem',
            children: children
        }
        return createHTMLElement(html)
    }

    createGreen(){
        const children = []

        const text = {
            type: 'div',
            class: 'colorSectionText',
            innerText: 'Some Placeholder Text Here'
        }
        children.push(createHTMLElement(text))

        const box = {
            type: 'div',
            class: 'colorSectionBox',
            innerText: '3'
        }
        children.push(createHTMLElement(box))

        const html = {
            type: 'div', 
            class: 'dashboardGreenWrapper shadow colorSectionItem',
            children: children
        }
        return createHTMLElement(html)
    }

    createRightColumn(){
        const children = []

        children.push(this.upperRight())

        children.push(this.lowerRight())

        const html = {
            type: 'div',
            class: 'dashboardRightColumn',
            children: children
        }
        return createHTMLElement(html)
    }

    upperRight(){
        const children = []

        children.push(this.upperRightLeft())

        children.push(this.upperRightRight())

        const html = {
            type: 'div',
            class: 'upperRight',
            children: children
        }
        return createHTMLElement(html)

    }

    upperRightLeft(){
        const children = []

        let item = new DashboardItem('Resume Previous Purchase', 'resume')
        children.push(item.HTMLElement)

        const wip1 = new DashboardWIP()
        children.push(wip1.HTMLElement)

        const wip2 = new DashboardWIP()
        children.push(wip2.HTMLElement)

        const html = {
            type: 'div', 
            class: 'upperRightLeft', 
            children: children
        }
        return createHTMLElement(html)
    }

    upperRightRight(){
        const children = []

        let item = new DashboardItem('Requires Your Attention', 'arrow')
        children.push(item.HTMLElement)

        const wip1 = new DashboardWIP()
        children.push(wip1.HTMLElement)

        const wip2 = new DashboardWIP()
        children.push(wip2.HTMLElement)

        const html = {
            type: 'div', 
            class: 'upperRightRight', 
            children: children
        }
        return createHTMLElement(html)
    }

    lowerRight(){
        const children = []

        const html = {
            type: 'div', 
            class: 'lowerRight shadow', 
            children: children
        }
        return createHTMLElement(html)
    }


}

class DashboardItem{
    constructor(text, icon, nav){
        this._UUID = createUUID(this)
        this._nav = nav
        this._text = text
        this._icon = icon
        this._html = this.createHTML()
    }

    get HTMLElement(){
        return this._html
    }

    createHTML(){
        const children = []
        
        const text = {
            type: 'div', 
            class: 'dashboardItemText',
            innerText: this._text
        }
        children.push(createHTMLElement(text))

        const icon = {
            UUID: this._UUID,
            type: 'div', 
            class: `dashboardItemIcon ${this._icon}`,
            "click": function (){
                globalObjects[this.getAttribute('data-UUID')].handleNavigation()
            }
        }
        children.push(createHTMLElement(icon))

        const html = {
            type: 'div',
            class: 'dashboardItem shadow',
            children: children
        }

        return createHTMLElement(html)
    }

    handleNavigation(){
        if(this._nav == 'new'){
            createPurchaseForm()
        }   
    }
}

class DashboardWIP{
    constructor(){
        this._html = this.createHTML()
    }

    get HTMLElement(){
        return this._html
    }

    createHTML(){
        const children = []

        const text = {
            type: 'div',
            class: 'dashboardWIPText', 
            innerText: 'Placeholder'
        }
        children.push(createHTMLElement(text))

        const graphic = {
            type: 'div', 
            class: 'dashboardWIPGraphic'
        }
        children.push(createHTMLElement(graphic))

        const html = {
            type: 'div',
            class: 'dashboardWIPWrapper shadow',
            children: children
        }

        return createHTMLElement(html)
    }
}

let inputGroup = null
const inputs = []

class PurchaseForm{
    constructor(data){
        this._data = data
        this._html = this.createHTML()
        inputGroup = new Util_Input_Group(inputs)
    }

    get HTMLElement(){
        return this._html
    }

    createHTML(){
        const children = []

        children.push(this.createPurchaseDetailsSection())
        children.push(this.createPaymentDetailsSection())
        children.push(this.createLineItemsSection())
        // children.push(this.createOrderCancelationSection())
        // children.push(this.createCodingSection())

        const html = {
            type: 'div',
            class: 'purchaseFormWrapper appear',
            children: children
        }

        return createHTMLElement(html)
    }

    createSectionTitle(title){
        const html = {
            type: 'div',
            class: 'purchaseFormSectionTitle',
            innerText: title
        }

        return createHTMLElement(html)
    }

    createPurchaseDetailsSection(){
        const children = []

        children.push(this.createSectionTitle('Order Details'))
        children.push(this.createDateTypeYearControl())
        children.push(this.createDivSubdivRequestorVendorAPD())
        // children.push(this.createOther())

        const html = {
            type: 'div',
            class: 'purchaseFormSection shadow',
            children: children
        }
        return createHTMLElement(html)
    }
    // let centerWidth = getCenterWidth() - 400
    createDateTypeYearControl(){
        const children = []

        // const purchaseDate = this._data ? this._data.purchaseDate : getFormattedDateAndTime().date 
        // const purchaseDateInput = new Util_Input('Purchase Date', 'purchaseDate', purchaseDate, '15rem')
        // inputs.push(purchaseDateInput.uuid)
        // children.push(purchaseDateInput.HTMLElement)
        const datePickerHTML = {
            id: 'purchaseDatePicker',
            type: 'input',
                attributes: [
                    {
                        key: 'type',
                        value: 'date'
                    },
                    {
                        key:'name',
                        value: 'purchaseDate'
                    }
                ]
        }
        const datePicker = createHTMLElement(datePickerHTML)
        datePicker.valueAsDate = new Date()
        children.push(datePicker)

        const purchaseTitle = this._data ? this._data.purchaseTitle : null
        const purchaseTileInput = new Util_Input('Purchase Title', 'title', purchaseTitle, null)
        inputs.push(purchaseTileInput.uuid)
        children.push(purchaseTileInput.HTMLElement)
        
        // const purchaseType = this._data ? this._data.purchaseType : null
        // const purchaseTypeInput = new Util_Input('Purchase Type', 'purchaseType', purchaseType, null)
        // inputs.push(purchaseTypeInput.uuid)
        // children.push(purchaseTypeInput.HTMLElement)
        const purchaseTypeHTML = {
            type: 'div',
            class: 'ddWrapper',
            id: 'purchaseTypeDD'
        }
        children.push(createHTMLElement(purchaseTypeHTML))

        // const purchaseFiscalYear = this._data ? this._data.fiscalYear : null 
        // const purchaseFiscalYearInput = new Util_Input('Fiscal Year', 'fiscalYear', purchaseFiscalYear, null)
        // inputs.push(purchaseFiscalYearInput.uuid)
        // children.push(purchaseFiscalYearInput.HTMLElement)
        const fiscalYearHTML = {
            type: 'div',
            class: 'ddWrapper',
            id: 'fiscalYearDD'
        }
        children.push(createHTMLElement(fiscalYearHTML))

        const purchaseControlNumber = this._data ? this._data.controlNumber : null 
        const purchaseControlNumberInput = new Util_Input('Control Number', 'controlNumber', purchaseControlNumber, null)
        inputs.push(purchaseControlNumberInput.uuid)
        children.push(purchaseControlNumberInput.HTMLElement)

        const html = {
            type: 'div', 
            class: 'purchaseFormHorizontalGroup',
            children: children
        }
        return createHTMLElement(html)
    }

    createDivSubdivRequestorVendorAPD(){
        const children = []

        // const purchaseDivision = this._data ? this._data.purchaseDivision : null
        // const purchaseDivisionInput = new Util_Input('Division', 'division', purchaseDivision, null)
        // inputs.push(purchaseDivisionInput.uuid)
        // children.push(purchaseDivisionInput.HTMLElement)
        const purchasingDivision = {
            type: 'div',
            class: 'ddWrapper',
            id: 'divisionDD'
        }
        children.push(createHTMLElement(purchasingDivision))

        const purchaseSubDivision = this._data ? this._data.purchaseSubDivision : null
        const purchaseSubDivisionInput = new Util_Input('Sub-Division', 'purchaseSubDivision', purchaseSubDivision, null)
        inputs.push(purchaseSubDivisionInput.uuid)
        children.push(purchaseSubDivisionInput.HTMLElement)
        // const purchasingSubDivision = {
        //     type: 'div',
        //     class: 'ddWrapper',
        //     id: 'subDivisionDD'
        // }
        // children.push(createHTMLElement(purchasingSubDivision))

        const purchaseRequestor = this._data ? this._data.purchaseRequestor : null 
        const purchaseRequestorInput = new Util_Input('Requestor', 'purchaseRequestor', purchaseRequestor, null)
        inputs.push(purchaseRequestorInput.uuid)
        children.push(purchaseRequestorInput.HTMLElement)

        const purchaseVendor = this._data ? this._data.purchaseVendor : null 
        const purchaseVendorInput = new Util_Input('Vendor', 'purchaseVendor', purchaseVendor, null)
        inputs.push(purchaseVendorInput.uuid)
        children.push(purchaseVendorInput.HTMLElement)

        const stateAPDNumber = this._data ? this._data.stateAPDNumber : null 
        const stateAPDNumberInput = new Util_Input('State APD Number: 50-', 'stateAPD', stateAPDNumber, null)
        inputs.push(stateAPDNumberInput.uuid)
        children.push(stateAPDNumberInput.HTMLElement)

        const html = {
            type: 'div', 
            class: 'purchaseFormHorizontalGroup',
            children: children
        }
        return createHTMLElement(html)
    }

    // createOther(){
    //     const children = []

    //     let centerWidth = getCenterWidth() - 400

    //     const purchaseOtherInfo = this._data ? this._data.otherInfo : null 
    //     const purchaseOtherInfoInput = new Util_Input('Other Information', 'description', purchaseOtherInfo, `${centerWidth}px`)
    //     inputs.push(purchaseOtherInfoInput.uuid)
    //     children.push(purchaseOtherInfoInput.HTMLElement)

    //     const html = {
    //         type: 'div', 
    //         class: 'purchaseFormHorizontalGroup',
    //         children: children
    //     }
    //     return createHTMLElement(html)
    // }

    createPaymentDetailsSection(){
        const children = []

        children.push(this.createSectionTitle('Payment Details'))
        children.push(this.createPaymentLine())

        const html = {
            type: 'div',
            class: 'purchaseFormSection shadow',
            children: children
        }
        return createHTMLElement(html)
    }

    createPaymentLine(){
        const children = []
        const paymentTypes = ['CreditCard', 'Purchase Order', 'Verizon']
        const pORequest = ['CIMS', 'Oracle', 'None']

        children.push(this.createCostEstimate())
        children.push(this.createRadioSection(paymentTypes, 'paymentTypes'))
        children.push(this.createRadioSection(pORequest, 'pORequest'))

        const purchaseOrder = this._data ? this._data.purchaseOrder : null 
        const purchaseOrderInput = new Util_Input('Purchase Order', 'purchaseOrder', purchaseOrder, null)
        inputs.push(purchaseOrderInput.uuid)
        children.push(purchaseOrderInput.HTMLElement)

        const html = {
            type: 'div', 
            class: 'purchaseFormHorizontalGroup',
            children: children
        }
        return createHTMLElement(html)
    }

    createCostEstimate(){
        const children = []

        const label = {
            type: 'div', 
            innerHTML: 'Estimated Cost:&nbsp;'
        }
        children.push(createHTMLElement(label))

        const amount = {
            type: 'span',
            id: 'estimatedCost',
            innerText: '$0'
        }
        children.push(createHTMLElement(amount))

        const html = {
            type: 'div',
            class: 'costEstimateWrapper',
            children: children
        }
        return createHTMLElement(html)
    }

    createRadioSection(options, name){
        const children = []

        for(let option of options){
            let optionChildren = []
            optionChildren.push(createHTMLElement({
                type: 'input',
                attributes: [
                    {
                        key: 'type',
                        value: 'radio'
                    },
                    {
                        key:'name',
                        value: name
                    },
                    {
                        key: 'value',
                        value: option
                    }
                ]
            }))

            optionChildren.push(createHTMLElement({
                type: 'span',
                class: 'checkmark'
            }))

            children.push(createHTMLElement({
                type: 'label',
                class: 'container',
                innerText: option,
                children: optionChildren
            }))
        }

        const html = {
            type: 'form',
            class: 'radioForm',
            children: children
        }
        return createHTMLElement(html)
    }

    // createOrderCancelationSection(){
    //     const children = []

    //     children.push(this.createSectionTitle('Purchase Cancellation'))

    //     let centerWidth = getCenterWidth() - 400

    //     const purchaseDisposition = this._data ? this._data.purchaseDisposition : null 
    //     const purchaseDispositionInput = new Util_Input('Disposition', 'purchaseDisposition', purchaseDisposition, `${centerWidth}px`)

    //     const horizontal = {
    //         type: 'div', 
    //         class: 'purchaseFormHorizontalGroup',
    //         child: purchaseDispositionInput.HTMLElement
    //     }
    //     children.push(createHTMLElement(horizontal))

    //     const html = {
    //         type: 'div',
    //         class: 'purchaseFormSection shadow',
    //         children: children
    //     }
    //     return createHTMLElement(html)
    // }

    createLineItemsSection(){
        const children = []

        children.push(this.createSectionTitle('Line Items'))

        children.push(this.lineItemsHeaders())

        const initialLineItemRow = new LineItem()
        const lineItemsWrapperHTML = {
            type: 'div',
            id: 'lineItemsWrapper',
            child: initialLineItemRow.HTMLElement
        }
        children.push(createHTMLElement(lineItemsWrapperHTML))

        children.push(this.lineItemsButtons())

        const html = {
            type: 'div',
            class: 'purchaseFormSection shadow',
            children: children
        }
        return createHTMLElement(html)
    }

    lineItemsButtons(){
        const children = []

        const removeLineHTML = {
            type: 'div',
            class: 'button',
            innerText: 'Remove A Line',
            'click': function (){
                workInProgress()
            }
        }
        children.push(createHTMLElement(removeLineHTML))

        const addLineHTML = {
            type: 'div',
            class: 'button',
            innerText: 'Add A Line',
            'click': function (){
                addNewLineItem()
            }
        }
        children.push(createHTMLElement(addLineHTML))

        const html = {
            type: 'div',
            id: 'lineItemsButtonWrapper',
            children: children
        }

        return createHTMLElement(html)
    }

    lineItemsHeaders(){
        const children = []

        children.push(createHTMLElement({
                type: 'div',
                class: 'lineItemItemNumber',
                innerText: 'Item #'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
                type: 'div',
                class: 'lineItemDescription',
                innerText: 'Description'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemPartNumber',
            innerText: 'Part #'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemTaxable',
            innerText: 'Taxable'
            })
        )
        children.push(divider())
        
        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemQuantity',
            innerText: 'Quantity'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemPrice',
            innerText: 'Price'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemSubtotal',
            innerText: 'Subtotal'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemSalesTax',
            innerText: 'Tax'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemLineTotal',
            innerText: 'Line Total'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemRecurring',
            innerText: 'Recurring'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemStartDate',
            innerText: 'Start Date'
            })
        )
        children.push(divider())

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemEndDate',
            innerText: 'End Date'
            })
        )

        const html = {
            type: 'div',
            id: 'lineItemHeaderWrapper',
            children: children
        }

        return createHTMLElement(html)
    }


    // createCodingSection(){
    //     const children = []

    //     children.push(this.createSectionTitle('Coding'))

    //     const html = {
    //         type: 'div',
    //         class: 'purchaseFormSection shadow',
    //         children: children
    //     }
    //     return createHTMLElement(html)
    // }

}

let lineItemCount = 0
const taxRate = .0788
const lineItemsUUIDs = []

class LineItem{
    constructor(){
        this._UUID = createUUID(this)
        lineItemsUUIDs.push(this._UUID)

        this._taxableToggle = null
        this._priceInput = null
        this._quantityInput = null
        this._subtotal = null
        this._salesTax = null
        this._lineTotal = null
        this._total = null

        this._recurringToggle = null
        this._startDate = null
        this._endDate = null


        this._html = this.createHTML()

        

        
    }

    get HTMLElement(){
        return this._html
    }

    get lineTotal(){
        this.calculateTotal()
        return this._total
    }

    calculateTotal(){
        let tax = this._taxableToggle.value ? taxRate : 0.00
        if(this._quantityInput.value == 0 || this._priceInput.value == 0){
            this._subtotal.innerText = '$0.00'
            this._salesTax.innerText = '$0.00'
            this._lineTotal.innerText = '$0.00'
            this._total = 0
            return
        }
        let subtotal = this._quantityInput.value * this._priceInput.value
        let salesTax = subtotal * tax
        let lineTotal = subtotal + salesTax
        this._subtotal.innerText = `$${subtotal.toFixed(2)}`
        this._salesTax.innerText = `$${salesTax.toFixed(2)}`
        this._lineTotal.innerText = `$${lineTotal.toFixed(2)}`
        this._total = lineTotal
    }

    runGlobalTotals(){
        updateLineItems()
    }

    toggleRecurring(){
        if(this._recurringToggle.value == true){
            this._startDate.style.opacity = 1
            this._endDate.style.opacity = 1
        }else{
            this._startDate.style.opacity = 0
            this._endDate.style.opacity = 0
        }
    }

    createHTML(){
        lineItemCount++
        const children = []

        children.push(createHTMLElement({
            type: 'div',
            class: 'lineItemItemNumber',
            innerText: `${lineItemCount}`
        }))
        children.push(divider())

        children.push(createHTMLElement({
            type: 'input',
            class: 'lineItemDescription',
            attributes: [
                {
                    key: 'type',
                    value: 'text'
                },
                {
                    key:'name',
                    value: 'itemDescription'
                }
            ]
        }))
        children.push(divider())

        children.push(createHTMLElement({
            type: 'input',
            class: 'lineItemPartNumber',
            attributes: [
                {
                    key: 'type',
                    value: 'text'
                },
                {
                    key:'name',
                    value: 'itemPartNumber'
                }
            ]
        }))
        children.push(divider())

        // children.push(createHTMLElement({
        //     type: 'div', 
        //     class: 'lineItemTaxable'
        // }))
        const taxableToggleSettings = {
            "wrapper": {
                "active": 'rgb(54,99,188)',
                "inactive": 'rgb(153, 155, 159)'
            },
            "thumb": {
                "color": 'rgb(255,255,255)'
            }
        }

        this._taxableToggle = new Util_Toggle(true, taxableToggleSettings, updateLineItems)
        children.push(createHTMLElement({
            type: 'div', 
            class: 'lineItemTaxable',
            child: this._taxableToggle.HTMLElement
        }))
        children.push(divider())

        const quantityInputHTML = {
            type: 'input',
            class: 'lineItemQuantity',
            attributes: [
                {
                    key: 'type',
                    value: 'number'
                },
                {
                    key:'name',
                    value: 'lineItemQuantity'
                },
                {
                    key: 'min',
                    value: 0
                },
                {
                    key: 'step',
                    value: 1
                },
                {
                    key: 'parent-UUID',
                    value: this._UUID
                }
            ],
            "change": function (){
                globalObjects[this.getAttribute('parent-UUID')].runGlobalTotals()
            }
        }
        this._quantityInput = createHTMLElement(quantityInputHTML)
        this._quantityInput.value = 1
        children.push(this._quantityInput)
        children.push(divider())

        this._priceInput = createHTMLElement({
            type: 'input',
            class: 'lineItemPrice',
            attributes: [
                {
                    key: 'type',
                    value: 'number'
                },
                {
                    key:'name',
                    value: 'lineItemPrice'
                },
                {
                    key: 'min',
                    value: 0.00
                },
                {
                    key: 'step',
                    value: 0.01
                },
                {
                    key: 'parent-UUID',
                    value: this._UUID
                }
            ],
            "change": function (){
                globalObjects[this.getAttribute('parent-UUID')].runGlobalTotals()
            }
        })
        children.push(this._priceInput)
        children.push(divider())

        this._subtotal = createHTMLElement({
            type: 'div', 
            class: 'lineItemSubtotal'
        })
        children.push(this._subtotal)
        children.push(divider())

        this._salesTax = createHTMLElement({
            type: 'div', 
            class: 'lineItemSalesTax'
        })
        children.push(this._salesTax)
        children.push(divider())

        this._lineTotal = createHTMLElement({
            type: 'div', 
            class: 'lineItemLineTotal'
        })
        children.push(this._lineTotal)
        children.push(divider())

        const recurringToggleSettings = {
            "wrapper": {
                "active": 'rgb(54,99,188)',
                "inactive": 'rgb(153, 155, 159)'
            },
            "thumb": {
                "color": 'rgb(255,255,255)'
            }
        }
        this._recurringToggle = new Util_Toggle(false, recurringToggleSettings, this.toggleRecurring.bind(this))

        children.push(createHTMLElement({
            type: 'div', 
            class: 'lineItemRecurring',
            child: this._recurringToggle.HTMLElement
        }))
        children.push(divider())

        const startDateHTML = {
            class: 'lineItemStartDate',
            type: 'input',
                attributes: [
                    {
                        key: 'type',
                        value: 'date'
                    },
                    {
                        key:'name',
                        value: 'recurringStartDate'
                    }
                ]
        }
        this._startDate = createHTMLElement(startDateHTML)
        this._startDate.style.opacity = 0
        this._startDate.valueAsDate = new Date()
        children.push(this._startDate)
        children.push(divider())

        const endDateHTML = {
            class: 'lineItemStartDate',
            type: 'input',
                attributes: [
                    {
                        key: 'type',
                        value: 'date'
                    },
                    {
                        key:'name',
                        value: 'recurringStartDate'
                    }
                ]
        }
        this._endDate = createHTMLElement(endDateHTML)
        this._endDate.style.opacity = 0
        this._endDate.valueAsDate = new Date()
        children.push(this._endDate)

        const html = {
            type: 'div',
            class: 'lineItemWrapper',
            UUID: this._UUID,
            children: children
        }

        return createHTMLElement(html)
    }

}

class NotePopup{
    // In order for this to work, the body element MUST have position set to relative
    constructor(){
        this._UUID = createUUID(this)
        this._title = 'Add A Note To This Purchase Request'
        this._textarea = null
        // this._message = message
        // this._associatedUUID = associatedUUID
        this._discard = {
            "text": "Discard",
            "click": function(){
                globalObjects[globalObjects[this.getAttribute('data-UUID')].parentPopup].hide()
            }
        }

        this._save = {
            "text": "Save",
            "click": function(){
                const note = globalObjects[globalObjects[this.getAttribute('data-UUID')].parentPopup].note
                saveNote(note)
                globalObjects[globalObjects[this.getAttribute('data-UUID')].parentPopup].hide()
            }
        }
        



        this._buttons = this.createPopupButtons([this._discard, this._save])
        this._HTML = this.createHTML()
    }

    get note(){
        return this._textArea.value
    }

    show(){
        const body = document.querySelector('body')
        body.appendChild(this._HTML)
    }

    hide(){
        removeDomAndObjectReference(this._HTML, true)
    }

    createHTML(){
        const HTML = {
            "UUID": this._UUID,
            "type": "div",
            "class": "util-popupBackground",
            child: this.createPopupContentHTML()
        }
        return createHTMLElement(HTML)
    }

    createPopupContentHTML(){
        const popupChildren = []
        if(this._title){
            const titleHTML = {
                "type": "div",
                "class": "util-popupTitle",
                "innerText": this._title
            }
            popupChildren.push(createHTMLElement(titleHTML))
        }

        this._textArea = createHTMLElement({
            type: 'textarea',
            id: 'purchaseRequestNoteArea'
        })
        popupChildren.push(this._textArea)

        // const messageHTML = {
        //     "type": "div",
        //     "class": "util-popupMessage",
        //     "innerText": this._message
        // }
        // popupChildren.push(createHTMLElement(messageHTML))

        const buttonWrapperHTML = {
            "type": "div",
            "class": "util-popupButtonWrapper",
            "children": this._buttons
        }
        popupChildren.push(createHTMLElement(buttonWrapperHTML))

        const popupHTML = {
            "type": "div",
            "class": "util-popupWrapper",
            "children": popupChildren
        }
        return createHTMLElement(popupHTML)
        
    }

    createPopupButtons(buttons){
        const buttonsArray = []
        for(const button of buttons){
            const btn = new Util_Popup_Button(this._UUID, button)
            buttonsArray.push(btn.HTMLElement)
        }
        return buttonsArray
    }
}

class NoteButton{
    constructor(parentPopup, data){
        this._UUID = createUUID(this)
        this._parentPopup = parentPopup
        this._data = data
        this._HTML = this.createHTML()
    }

    createHTML(){
        const HTML = {
            "UUID": this._UUID,
            "type": "div",
            "class": "util-popupButton",
            "innerText": this._data.text,
            "click": this._data.click
        }
        return createHTMLElement(HTML)
    }

    get HTMLElement(){
        return this._HTML
    }

    get parentPopup(){
        return this._parentPopup
    }
}

class NoteSection{
    constructor(){
        this._html = this.createNotesSection()
    }

    get HTMLElement(){
        return this._html
    }

    createNotesSection(){
        const children = []

        children.push(this.createSectionTitle('Notes'))

        children.push(createHTMLElement({
            type: 'div',
            id: 'notesWrapper'
        }))

        const html = {
            type: 'div',
            id: 'notesSection',
            class: 'purchaseFormSection shadow',
            children: children
        }
        return createHTMLElement(html)
    }

    createSectionTitle(title){
        const html = {
            type: 'div',
            class: 'purchaseFormSectionTitle',
            innerText: title
        }

        return createHTMLElement(html)
    }
}

class Note{
    constructor(data){
        this._note = data.note
        this._user = data.user
        this._time = data.time
        this._html = this.createHTML()
    }

    get HTMLElement(){
        return this._html
    }

    createHTML(){
        if(!document.querySelector('#notesSection')){
            const noteSection = new NoteSection()
            const purchaseFormWrapper = document.querySelectorAll('.purchaseFormWrapper')[0]
            purchaseFormWrapper.appendChild(noteSection.HTMLElement)
        }

        const children = []

        children.push(createHTMLElement({
            type: 'div', 
            class: 'theNote', 
            innerText: this._note
        }))

        children.push(createHTMLElement({
            type: 'div', 
            class: 'theAuthor', 
            innerText: `${this._user} ${this._time}`
        }))

        const html = {
            type: 'div',
            class: 'noteWrapper',
            children: children
        }

        return createHTMLElement(html)
    }
}