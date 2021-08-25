const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await (await driver).get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await (await driver).quit()
})

test('This should add a movie to the list', async () => {

    let movieTitle = ["The Phantom Menace", "Attack of the Clones", 
        "Revenge of the Sith", "A New Hope", "Empire Strikes Back", 
        "Return of the Jedi", "The Force Awakens", "The Last Jedi", 
        "The Rise of Skywalker"]

    let textbox = await driver.findElement(By.xpath('/html/body/main/section/form/input'))
    let button = await driver.findElement(By.xpath('/html/body/main/section/form/button'))
    let movieId = []

    for(let i = 0; i < movieTitle.length; i++){
        await textbox.sendKeys(`${movieTitle[i]}`)
        await button.click()
        movieId.push(movieTitle[i].replace(/\s/g, ''))
    }
    // await driver.sleep(3000)

    let resultsText = []
    for(let i = 0; i < movieId.length; i++){
        resultsText.push(await driver.findElement(By.id(`${movieId[i]}`)).getText())

    }
    // expect(resultsText).toEqual(movieTitle)

    // await textbox.sendKeys(`${movieTitle[1]}`)
    // await button.click()
    // await textbox.sendKeys(`${movieTitle[2]}`)
    // await button.click()

    let listItem = []

    // let listItemOne = await driver.findElement(By.xpath('(/html/body/main/ul/li/span)'))
    // let listItemTwo = await driver.findElement(By.xpath('(/html/body/main/ul/li/span)[2]'))
    // let listItemThree = await driver.findElement(By.xpath('(/html/body/main/ul/li/span)[3]'))

    for(let i = 0; i < movieTitle.length; i++){
        if(i==0){
           listItem.push(await driver.findElement(By.xpath('(/html/body/main/ul/li/span)')))
        }
        else{
            listItem.push(await driver.findElement(By.xpath(`(/html/body/main/ul/li/span)[${i+1}]`)))
        }
    }

    // await listItemOne.click()
    // await listItemTwo.click()
    // await listItemThree.click()
    for(let i = 0; i < listItem.length; i++){
        await listItem[i].click()
    }

    // let deleteButton= [] 
    // for(let i = 0; i<movieTitle.length;i++){
    //     deleteButton.push(await driver.findElement(By.xpath(`(/html/body/main/ul/li/button)[${i+1}]`)))
    // }
    await driver.sleep(5000)

    let deleteButtons = []
    for(let i = 0; i < movieId.length; i++){
        deleteButtons.push(await driver.findElement(By.id(`${movieId[i]}`)))
    }
    for(let i = 0; i < deleteButtons.length; i++){
        await deleteButtons[i].click()
    }
    // let deleteButtonOne = await driver.findElement(By.id("ThePhantomMenace"))

    // let deleteButtonTwo = await driver.findElement(By.xpath('(/html/body/main/ul/li/button)[2]'))

    // let deleteButtonThree = await driver.findElement(By.xpath('(/html/body/main/ul/li/button)[3]'))
    // for(let i = 0 ; i < deleteButton.length; i++){
    //     await deleteButton[i].click()
    // }

    // await deleteButtonOne.click()
    // await deleteButtonTwo.click()
    // await deleteButtonThree.click()

})