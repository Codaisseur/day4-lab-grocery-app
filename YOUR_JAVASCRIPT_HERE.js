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

function createGroceryItemElement(groceryItem){
  const liItem = document.createElement('li')
  groceryItem.checked ? liItem.className = 'groceryItem bought' : liItem.className = 'groceryItem'

  const checkBox = document.createElement('input')
  checkBox.setAttribute("type", "checkbox")
  checkBox.checked = groceryItem.checked
  checkBox.onchange = toggleBought

  const quantityLabel = document.createElement('label')
  quantityLabel.setAttribute("for", "quantity")
  quantityLabel.innerText = groceryItem.quantity

  const nameLabel = document.createElement('label')
  nameLabel.setAttribute("for", "name")
  nameLabel.innerText = groceryItem.name
  
  liItem.appendChild(checkBox)
  liItem.appendChild(quantityLabel)
  liItem.appendChild(nameLabel)
  
  return liItem
}

function displayGroceryList() {
  const list = document.getElementById('groceryList')

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  groceryItems.forEach(function(item){
    const listElement = createGroceryItemElement(item)
    list.appendChild(listElement)
  })
}

function toggleBought(event){
  const checkbox = event.target

  if (checkbox.checked) {
    event.target.parentElement.className = 'groceryItem bought'  
  } else {
    event.target.parentElement.className = 'groceryItem'  
  }
}
