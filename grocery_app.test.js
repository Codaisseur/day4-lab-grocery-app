// This script tests your code, it will run everytime you refresh
// It will call your functions and will change you hero object a bit
// If you don't want to run the tests for a while comment all this code out.

const { expect } = chai
describe('Userstory 1: displaying a list of groceries (in the easiest possible way)', function(){
  describe('displaying a list of grocery items', function(){
    it('There should be an unordered list with id \'groceryList\'', function(){
      const list = document.getElementById('groceryList')
      expect(list).to.not.equal(null)
      expect(list.tagName).to.equal('UL')
    })

    it('The groceryList should contain at least two items', function(){
      const list = document.getElementById('groceryList')
      expect(list.children.length).to.be.gte(2)
    })

    it(`The HTML of a gropceryItem should be a list item (li), 
      with a class \'groceryItem\',
      and it should contain an input of the type \'checkbox\' 
      `, function(){
      const list = document.getElementById('groceryList')
      Array.from(list.children).forEach(function(item){
        expect(item.tagName).to.equal('LI')
        expect(item.className.includes('groceryItem')).to.equal(true)

        const checkbox = Array.from(item.children).find(function(child){
          return child.tagName === 'INPUT' && child.type === 'checkbox'
        })

        expect(checkbox).to.not.equal(undefined)
      })
    })
  })
})

describe('Userstory 1: displaying a list of groceries (that is dynamically generated)', function(){
  describe('The data model for the groceryApp', function(){
    it(`The groceryItems in this app should be represented as an array, 
      it should be assigned to a variable called \'groceryItems\'`, function(){
        expect(sinon.match.defined.test(groceryItems)).to.equal(true)
        expect(groceryItems, 'groceryItems is not an array').to.be.an('array')
    })

    it('the groceryItems should be an array of objects, it should contain at least three elements (for testing)', function(){
      expect(groceryItems.length).to.gte(3)
      groceryItems.forEach(function(item){
        expect(item).to.be.an('object')
      })
    })

    it('a groceryItem should contain the properties:\'quantity\' (number), \'name\' (string) and \'checked\' (boolean), ', function(){
      groceryItems.forEach(function(item){
        expect(item).to.have.keys(['name', 'quantity', 'checked'])
      })
    })
  })

  describe('Should generate the list items based on the data', function(){
    describe('createGroceryItemElement', function(){
      it('There should be a function called createGroceryItemElement', function(){
        expect(sinon.match.defined.test(createGroceryItemElement)).to.equal(true)
      })
      it(`It should take a groceryItem object as an argument (with quantity, name and checked properties)
        and it should return a li HTML element`, function(){
          const liElement = createGroceryItemElement({ quantity: 5, name: 'apples', checked: false})
          expect(liElement).to.not.equal(undefined)
          expect(liElement.tagName).to.equal('LI')
      })
      it(`The li element returned from groceryItem should have at least 3 children: 
        labels for quantity, name and an input with type checkbox (look at example list item in the HTML)`, function(){
        const liElement = createGroceryItemElement({ quantity: 5, name: 'apples', checked: true})
        const children = Array.from(liElement.children)
        const nameLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'name')
        expect(nameLabel).to.not.equal(undefined)

        const quantityLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'quantity')
        expect(quantityLabel).to.not.equal(undefined)

        const checkbox = children.find(child => child.tagName === 'INPUT' && child.type === 'checkbox')
        expect(checkbox).to.not.equal(undefined)
      })

      it(`The labels have innerText equal to the groceryItem object that was passed in`, function(){
        const liElement = createGroceryItemElement({ quantity: 5, name: 'apples', checked: true})
        const children = Array.from(liElement.children)
        const nameLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'name')
        expect(nameLabel.innerText.includes('apples')).to.equal(true)

        const quantityLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'quantity')
        expect(quantityLabel.innerText).to.equal('5')

        const checkbox = children.find(child => child.tagName === 'INPUT' && child.type === 'checkbox')    
        expect(checkbox.checked).to.equal(true)
      })

      it(`If the groceryItem object\'s check property is true, the checkbox should be checked and the listItem should have also have class \'bought if it is false the checkbox should be unchecked`, function(){
        const liElementChecked = createGroceryItemElement({ quantity: 5, name: 'apples', checked: true})
        const childrenChecked = Array.from(liElementChecked.children)

        const checkboxChecked = childrenChecked.find(child => child.tagName === 'INPUT' && child.type === 'checkbox')    
        expect(liElementChecked.className.includes('bought')).to.equal(true)
        expect(checkboxChecked.checked).to.equal(true)

        const liElementUnchecked = createGroceryItemElement({ quantity: 5, name: 'apples', checked: false})
        const childrenUnchecked = Array.from(liElementUnchecked.children)

        const checkboxUnchecked = childrenUnchecked.find(child => child.tagName === 'INPUT' && child.type === 'checkbox')    
        expect(checkboxUnchecked.checked).to.equal(false)
      })
    })


    describe('displayGroceryList', function(){
      it('There should be a function called displayGroceryList', function(){
        expect(sinon.match.defined.test(createGroceryItemElement)).to.equal(true)
      })

      it('It calls the createGroceryItemElement function for every element in the groceryItems array and appends the created html elements to the groceryList', function(){
        const currentItemsCount = document.getElementById('groceryList').children.length
        const arrayLength = groceryItems.length
        displayGroceryList()

        const newItemsCount = document.getElementById('groceryList').children.length
        expect(newItemsCount === arrayLength || newItemsCount === (currentItemsCount + arrayLength)).to.equal(true)
      })

      it('It clears the current items from the list before adding new items', function(){
        const arrayLength = groceryItems.length
        displayGroceryList()

        const newItemsCount = document.getElementById('groceryList').children.length
        expect(newItemsCount).to.equal(arrayLength)
      })
    })
  })
})

describe('Story 2: As a consumer, I want to cross items of my list', function(){
  describe('toggleBought (simple)', function(){
    it('There should be a function called displayGroceryList', function(){
      expect(sinon.match.defined.test(toggleBought)).to.equal(true)
    })

    it('All checkboxes should have an onchange eventListener which has toggleBought as an event handler', function(){
      Array.from(document.getElementsByTagName('INPUT')).forEach(input => {
        if(input.type === 'checkbox'){
          expect(input.onchange).not.to.equal(null)
          expect(input.onchange.name).to.equal('toggleBought')
        }
      })
    })

    it('clicking an unchecked checkbox should add the class \'bought\' to the parent li element of the checkbox', function(){
      const uncheckedCheckbox = Array.from(document.getElementsByTagName('input')).find(input => input.type === 'checkbox' && input.checked === false)
      const parentListItem = uncheckedCheckbox.parentElement

      expect(parentListItem.className.includes('bought')).to.equal(false)
      uncheckedCheckbox.click()
      expect(parentListItem.className.includes('bought')).to.equal(true)
    })
  })
})



