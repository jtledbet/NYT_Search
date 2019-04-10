// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

// "/articlesearch.json?q={query}&fq={filter}"

var apiKey = "Mj2pf5aHaHSFfxzqD3Wkc4yE8jC2ikZZ"
var searchTerm = "nuclear"
var numRecs = 10
var beginDate = 20000101
var endDate = 20190101
var pageUrl = "#"
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + apiKey


$("#searchBtn").on("click", function(event){
    event.preventDefault();
    $("#article-list").empty();
    var searchContent = $("#inputSearch").val();
    var numOfRecords = $("#inputRecords").val();
    var startYear = $("#inputStartYear").val();
    var endYear = $("#inputEndYear").val();
    
    // console.log(searchContent);
    // console.log(numOfRecords);
    // console.log(startYear);
    // console.log(endYear);

    // console.log(searchTerm);
    // console.log(numRecs);
    console.log(beginDate);
    console.log(endDate);

    if (searchContent != "") searchTerm = searchContent;
    if (numOfRecords != "") numRecs = numOfRecords;
    
    if (startYear != "" && startYear.length === 8 && !isNaN(startYear)) {
        console.log("converting start year")
        beginDate = startYear; 
        if (endYear != "" && endYear.length === 8 && !isNaN(endYear)) {
            endDate = endYear;
            console.log("converting end year")
        }
    }

    // console.log(searchTerm);
    // console.log(numRecs);
    console.log("beginDate: " + beginDate);
    console.log("endDate: " + endDate);

    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + apiKey
    
    var ajaxOptions = {
        url: queryURL,
        method: "GET"
    };

    console.log("url should be changed")

    $.ajax(ajaxOptions).then(function (response) {
        console.log("queryURL: " + queryURL)
        response = response.response
        console.log(response)
        
    
        var numberOfArticles = response.docs.length;
    
        for (i = 0; i < numRecs; i++) {
            var headline = response.docs[i].headline.main;
            var snippet = response.docs[i].snippet;
            var wordCount = response.docs[i].word_count;

            if (response.docs[i].byline.original) {
                var author = response.docs[i].byline.original;
                    if (author === null) author = "Author N/A"
            }
            var date = response.docs[i].pub_date;
            var pageURL = response.docs[i].web_url;
    
            // console.log("  headline: " + headline + 
            // "\n  snippet: " + snippet + "\n  wordcount: " + wordCount + 
            // "\n  author: " + author + "\n  date: " + date)
            
            var place = i + 1;
            newNode = $("<div>")
            newNode.addClass("card")
            newNodeNum = $("<h2>").text("#" + place);
            newNodeHeader = $("<h3>").html("<a target='_blank' href=" + pageURL + ">" + headline + "</a>")
            newNodeHeader.addClass("card-header")
            newNodeSnippet = $("<p>").text(snippet)
            newNodeSnippet.addClass("card-body")
            newNodeAuthor = $("<h3>").text(author)
            newNodeAuthor.addClass("card-footer")
            newNodeDate = $("<h3>").text("Date published: " + date.slice(0, 10))
            newNodeDate.addClass("card-footer")
            newNodeWordCount = $("<h3>").text("Word Count: " + wordCount)
            newNodeWordCount.addClass("card-footer")
    
            newNode.append(newNodeNum)
            newNode.append(newNodeHeader)
            newNode.append(newNodeSnippet)
            newNode.append(newNodeAuthor)
            newNode.append(newNodeDate)
            newNode.append(newNodeWordCount)
                
            $("#article-list").append(newNode)
    
        }
    });
    

    // console.log(searchContent[0].value);
    // console.log(numOfRecords[0].value);
    // console.log(startYear[0].value);
    // console.log(endYear[0].value);
});