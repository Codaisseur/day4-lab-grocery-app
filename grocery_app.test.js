// This script tests your code, it will run everytime you refresh
// It will call your functions and will change you hero object a bit
// If you don't want to run the tests for a while comment all this code out.

const { expect } = chai
describe('Userstory 1: displaying a list of groceries', function(){
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

describe('Story 2: As a consumer, I want to cross items of my list', function(){
  describe('toggleBought', function(){
    it('There should be a function called displayGroceryList', function(){
      expect(sinon.match.defined.test(toggleBought)).to.equal(true)
    })

    it('All checkboxes should have an onchange eventListener which has toggleBought as an event handler', function(){
      Array.from(document.getElementsByTagName('INPUT')).forEach(input => {
        if(input.type === 'checkbox'){
          console.log(input.onchange);
          
          expect(input.onchange).not.to.equal(null)
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

describe('Userstory 3: Adding items to the list', function(){
  describe('createGroceryItemElement', function(){
    it('There should be a function called createGroceryItemElement', function(){
      expect(sinon.match.defined.test(createGroceryItemElement)).to.equal(true)
    })
    it(`It should take a quantity and name as arguments and it should return a li HTML element`, function(){
        const liElement = createGroceryItemElement({ quantity: 5, name: 'apples'})
        expect(liElement).to.not.equal(undefined)
        expect(liElement.tagName).to.equal('LI')
    })
    it(`The li element returned from groceryItem should have at least 3 children: 
      labels for quantity, name and an input with type checkbox (look at example list item in the HTML)`, function(){
      const liElement = createGroceryItemElement('apples', 5)
      const children = Array.from(liElement.children)
      const nameLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'name')
      expect(nameLabel).to.not.equal(undefined)

      const quantityLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'quantity')
      expect(quantityLabel).to.not.equal(undefined)

      const checkbox = children.find(child => child.tagName === 'INPUT' && child.type === 'checkbox')
      expect(checkbox).to.not.equal(undefined)
    })

    it(`The labels have innerText equal to arguments that were passed in`, function(){
      const liElement = createGroceryItemElement('apples', 5)
      const children = Array.from(liElement.children)
      const nameLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'name')
      expect(nameLabel.innerText.includes('apples')).to.equal(true)

      const quantityLabel = children.find(child => child.tagName === 'LABEL' && child.htmlFor === 'quantity')
      expect(quantityLabel.innerText).to.equal('5')

      const checkbox = children.find(child => child.tagName === 'INPUT' && child.type === 'checkbox')    
      expect(checkbox.checked).to.equal(false)
    })
  })

  describe('form', function(){
    it('There should be a form, with an onsubmit event listener that has submitGroceryItem as an event Handler', function(){
      const form = document.getElementsByTagName('FORM')[0]
      
      expect(form.onsubmit).not.to.equal(null)
    })

    it('It should have an input with the type \'submit\'', function(){
      const form = document.getElementsByTagName('FORM')[0]

      const submitButton = Array.from(form.children).find(child => child.tagName === 'INPUT' && child.type === 'submit')
      expect(submitButton).not.to.equal(undefined)
    })

    it('The form should have 2 inputs: 1 for name (with id = "itemName") and 1 for quantity (with id = "itemQuantity")', function(){
      const nameinput = document.getElementById('itemName')
      const quantityinput = document.getElementById('itemQuantity')

      expect(nameinput).not.to.equal(null)
      expect(quantityinput).not.to.equal(null)
      expect(nameinput.parentElement.tagName).to.equal('FORM')
      expect(quantityinput.parentElement.tagName).to.equal('FORM')
    })
  })

  describe('submitGroceryItem', function(){
    it('There should be a function called submitGroceryItem', function(){
      expect(sinon.match.defined.test(submitGroceryItem)).to.equal(true)
    })

    it('Should take the value of the input fields in the form and call createGroceryItemElement to create a list item and append it to the list', function(){
      document.getElementById('itemName').value = 'cookies'
      document.getElementById('itemQuantity').value = '4'
      
      const form = document.getElementsByTagName('FORM')[0]

      const submitButton = Array.from(form.children).find(child => child.tagName === 'INPUT' && child.type === 'submit')
      submitButton.click()
      
      const groceryItems = document.getElementById('groceryList').children
      const lastItem = groceryItems[groceryItems.length - 1]
      
      const itemNameLastChild = Array.from(lastItem.children).find(element => element.tagName === 'LABEL' && element.htmlFor === 'name')
      expect(itemNameLastChild.innerText).to.equal('cookies')

      const quantityLastChild = Array.from(lastItem.children).find(element => element.tagName === 'LABEL' && element.htmlFor === 'quantity')
      expect(quantityLastChild.innerText).to.equal('4')
    })
  })
})

