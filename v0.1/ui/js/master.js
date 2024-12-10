let employees = null

const init = async () =>{
    // createRequestPurchasePage()
    // let dataURL = `${path}json/employees.php`
    // employees =  await JSONRequest("GET", dataURL)
    // createRequestPurchasePage()
    // const a = 12.57
    // console.log(Math.sqrt(a/Math.PI))
    addListeners()
    setInitialColors()
    loadDashboard()
}

const addListeners = () =>{
    addLeftMenuListeners()
    addSaveButton()
    addNoteButton()
    addCloseButton()
    tempAddOtherButtons()
}

const addNoteButton = () =>{
    const noteButton = document.querySelector('#noteButton')
    noteButton.addEventListener('click', startPurchaseNote)
}

const startPurchaseNote = () =>{
    let note = new NotePopup()
    note.show()
    const purchaseRequestNoteArea = document.querySelector('#purchaseRequestNoteArea')
    purchaseRequestNoteArea.focus()
}

const tempAddOtherButtons = () =>{
    const editButton = document.querySelector('#editButton')
    const printButton = document.querySelector('#printButton')
    editButton.addEventListener('click', workInProgress)
    printButton.addEventListener('click', workInProgress)
}

const addCloseButton = () =>{
    const closeButton = document.querySelector('#closeButton')
    closeButton.addEventListener('click', backToDashboard)
}

const backToDashboard = () =>{
    setLocation('menuDashboard')
}

const addSaveButton = () =>{
    const saveButton = document.querySelector('#saveButton')
    saveButton.addEventListener('click', submitNewPurchase)
}

const setInitialColors = () =>{
    root.style.setProperty('--util-textInput-borderColor:', 'rgb(153,155,159)')
    root.style.setProperty('--util-textInput-activeColor', 'rgb(54,99,188)')
    root.style.setProperty('--util-textInput-labelColor', 'rgb(153,155,159)')
    root.style.setProperty('--util-popup-button-color', 'rgb(54,99,188)')
}

const addLeftMenuListeners = () =>{
    const menuItems = document.querySelectorAll('.menuItem')
    for(const item of menuItems){
        item.addEventListener('click', setLeftBarSelected)
    }
}

const showDynamicMenu = () =>{
    const dynamicMenu = document.querySelector('#dynamicMenu')
    dynamicMenu.style.width = '30rem';
}

const hideDynamicMenu = () =>{
    const dynamicMenu = document.querySelector('#dynamicMenu')
    dynamicMenu.style.width = '0rem';
}

const setLeftBarSelected = (e) =>{
    let target = e.target
    const menuItems = document.querySelectorAll('.menuItem')
    for(const item of menuItems){
        item.setAttribute('selected', 'false')
    }
    
    if(target.className.includes('menuItem')){
        target.setAttribute('selected', 'true')
    }else{
        target = target.parentNode
        target.setAttribute('selected', 'true')
    }

    hideDynamicMenu()

    let location = target.querySelector('.menuIcon').id 
    setLocation(location)
}

const leftSideBarNoneSelected = () =>{
    const menuItems = document.querySelectorAll('.menuItem')
    for(const item of menuItems){
        item.setAttribute('selected', 'false')
    }
}

const setLocation = (location) =>{
    const locationDiv = document.querySelector('#location')
    switch (location){
        case 'menuDashboard':
            locationDiv.innerText = 'Dashboard'
            loadDashboard()
            break
        case 'menuNotifications':
            locationDiv.innerText = 'Notifications'
            nothingToSeeHere('You have no notifications. Yay.')
            break
        case 'menuContinue':
            locationDiv.innerText = 'Continue'
            nothingToSeeHere('You have no incomplete tasks. Good Job.')
            break
        case 'menuSettings':
            locationDiv.innerText = 'Settings'
            nothingToSeeHere('This is where settings, such as Dark Mode, will be.')
            break
        default:
            locationDiv.innerText = location
            break
    }
}

const nothingToSeeHere = (message) =>{
    const content = document.querySelector('#content')
    content.innerHTML = null
    const ntsh = new NothingToSeeHere(message)
    content.appendChild(ntsh.HTMLElement)
}

const loadDashboard = () =>{
    const content = document.querySelector('#content')
    content.innerHTML = null
    const dashboard = new Dashboard()
    content.appendChild(dashboard.HTMLElement)
}

const createPurchaseForm = () =>{
    leftSideBarNoneSelected()
    showDynamicMenu()
    setLocation('Purchase Request')
    const content = document.querySelector('#content')
    content.innerHTML = null

    const purchaseForm = new PurchaseForm(null)
    content.appendChild(purchaseForm.HTMLElement)
    insertPurchaseFormDDs()
}

const insertPurchaseFormDDs = () =>{
    const dds = ['purchaseTypeDD', 'fiscalYearDD', 'divisionDD']
    const data = [purchaseTypes.type, fiscalYear.year, requestingDivision.division]
    const titles = ['Purchase Type', 'Fiscal Year', 'Division']

    for(let [index,value] of dds.entries()){
        createDD(dds[index], data[index], titles[index])
    }
}

const createDD = (id, data, title) =>{
    let dropdown = new Dropdown(id, "nodata", true)
    dropdown.setJSONData(data)
    dropdown.delayedInit()
    dropdown.setMode('single')
    dropdown.setTitle(title)
    dropdown.setDefaultTitle(title)
    dropdown.setColors("#3663bc", "#999b9f")
    dropdown.setTextColor("#080705")
    dropdown.setBorderRadius('0px')
    dropdown.setLimit(5)
}

const divider = () =>{
    return createHTMLElement({
        type: 'div',
        class: 'divider'
    })
}

const getCenterWidth = () =>{
    return document.querySelector('#content').offsetWidth
}

const updateLineItems = () =>{
    let runningTotal = 0
    let totalSpan = document.querySelector('#estimatedCost')
    for(let line of lineItemsUUIDs){
        runningTotal += globalObjects[line].lineTotal
    }
    totalSpan.innerText = `$${runningTotal.toFixed(2)}`
}

const addNewLineItem = () =>{
    const lineItemsWrapper = document.querySelector('#lineItemsWrapper')
    const newLine = new LineItem()
    lineItemsWrapper.appendChild(newLine.HTMLElement)
}

const workInProgress = () =>{
    const popup = new Util_Popup("In Development", 'This feature is still being worked on.', [{
        "text": "OK",
        "click": function(){
            globalObjects[globalObjects[this.getAttribute('data-UUID')].parentPopup].hide()
        }
    }])
    popup.show()
}

const notify = (message) =>{
    const popup = new Util_Popup(null, message, [{
        "text": "OK",
        "click": function(){
            globalObjects[globalObjects[this.getAttribute('data-UUID')].parentPopup].hide()
        }
    }])
    popup.show()
}

const justATest = (test) =>{
    console.log(test)
}
 
window.addEventListener("DOMContentLoaded", init, true)
