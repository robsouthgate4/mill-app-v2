// archives.js

var faker = require('faker')

function generateData() {
    var archives = []
    var categories = []

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
     }

    for (var i = 0; i < 20; i++) {

        var name = faker.commerce.productName()
        var enabled = faker.random.boolean()
        var videosSynced = getRandomInt(0, 400)

        categories.push({
            name: name,
            enabled: enabled,
            videos_synced: videosSynced
        })

    }

    for (var i = 0; i < 1000; i++) {

        var id = faker.random.uuid()
        var name = faker.commerce.productName()
        var brand = faker.company.companyName()
        var enabled = faker.random.boolean()
        var createdAt = faker.date.past()
        var updatedAt = faker.date.recent()
        var tags = []
        var credits = []
        var creditDetails = []
        var title = faker.commerce.productName()
        var articleUrl = faker.internet.url()
        var intro = faker.lorem.sentence()
        var summary = faker.lorem.paragraph()

        for (var j = 0; j < getRandomInt(0, 20); j++ ) {

            creditDetails.push({
                name: faker.random.word(),
                content: faker.name.firstName() + ' ' + faker.name.lastName()
            });

            credits.push({
                name: faker.random.word(),
                credit_details: creditDetails
            })

        }

        for (var j = 0; j < getRandomInt(0, 10); j++ ) {
            tags.push({
                name: faker.random.word()
            })
        }

        var links = {
            thumbnail: {
                href: faker.image.imageUrl()
            },
            video: {
                href: faker.internet.url()
            }
        }

        archives.push(
            {
                "id": id,
                "name": name,
                "created_at": createdAt,
                "updated_at": updatedAt,
                "tags": tags,
                "credits": credits,
                "brand": brand,
                "title": title,
                "article_url": articleUrl,
                "intro": intro,
                "summary": summary,
                "_links": links,
                "enabled": faker.random.boolean()
            }
        )
    }

    return {"archives": archives, "categories": categories}
}

// json-server requires that you export
// a function which generates the data set
module.exports = generateData
