// Write your JS here

const groceryItems = [
  {
    name: 'Oranges',
    quantity: 0,
    checked: true
  }, 
  {
    name: 'Peaches',
    quantity: 0,
    checked: false
  }, 
  {
    name: 'Dogfood',
    quantity: 0,
    checked: false
  }
]

function createGroceryItemElement(name, quantity){
  const liItem = document.createElement('li')

  const checkBox = document.createElement('input')
  checkBox.setAttribute("type", "checkbox")
  checkBox.checked = false
  checkBox.onchange = toggleBought

  const quantityLabel = document.createElement('label')
  quantityLabel.setAttribute("for", "quantity")
  quantityLabel.innerText = quantity

  const nameLabel = document.createElement('label')
  nameLabel.setAttribute("for", "name")
  nameLabel.innerText = name
  
  liItem.appendChild(checkBox)
  liItem.appendChild(quantityLabel)
  liItem.appendChild(nameLabel)
  
  return liItem
}

function toggleBought(event){
  const checkbox = event.target

  if (checkbox.checked) {
    event.target.parentElement.className = 'groceryItem bought'  
  } else {
    event.target.parentElement.className = 'groceryItem'  
  }
}

function submitGroceryItem(){
  const newItemName = document.getElementById('itemName').value
  const newItemQuantity = document.getElementById('itemQuantity').value
  
  const listItem = createGroceryItemElement(newItemName, newItemQuantity)
  document.getElementById('groceryList').appendChild(listItem)
}
