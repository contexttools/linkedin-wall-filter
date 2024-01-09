// ==UserScript==
// @name         LinkedIn Post Filter
// @namespace    https://softreck.com/
// @version      0.1
// @description  Filter LinkedIn posts by blacklist keywords.
// @author       You
// @match        https://www.linkedin.com/feed/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    
    
    let lastTextareaValue = "";

    // Function to handle new words added to the textarea
    function handleNewWord(newWord) {
        console.log('New word added:', newWord);
        //preFilter();
        // Add custom logic here for what to do with the new word
    }

    // Function to check for new words in the textarea
    function checkForNewWords(textareaValue) {
        const words = textareaValue.split(/\s+/).filter(Boolean); // Split by any whitespace and remove empty strings
        const lastWords = lastTextareaValue.split(/\s+/).filter(Boolean);
        
        // Find words that are in the current value but not in the last saved value
        words.forEach(word => {
            if (!lastWords.includes(word)) {
                handleNewWord(word);  // A new word has been detected
            }
        });

        lastTextareaValue = textareaValue; // Update the last known state
    }
    
    // Create a textarea at the bottom of the page
    let blacklistTextarea = document.createElement('textarea');
    blacklistTextarea.id = 'blacklist-textarea';    
    blacklistTextarea.style = 'border: 1px solid red; font: Arial 10px red; position: fixed; bottom: 10px; left: 10px; width: 400px; height: 90px; z-index: 1000;';
//    blacklistTextarea.placeholder = 'Enter keywords to filter by, separated by commas...';

    // Append the textarea to the body
    document.body.appendChild(blacklistTextarea);
    var lastPostCount = 0


    // Event listener to detect new words whenever the textarea is updated
    blacklistTextarea.addEventListener('input', (e) => {
        checkForNewWords(e.target.value);
        // Rest of the input event code...
    });

    // Function to read cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to save value to a cookie with expiry of 365 days
    function setCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + (365*24*60*60*1000)); // 365 days expiration
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function preFilter(){
        if (blacklistTextarea.value.length > 1){
            const blacklist = blacklistTextarea.value.split(',').map(word => word.trim().toLowerCase());
            filterPostsByKeywords(blacklist);
            setCookie('linkedin_wall_filter_keywords', encodeURIComponent(blacklistTextarea.value));
        }
    }
    
    // Load saved keywords from cookie
    const savedKeywords = getCookie('linkedin_wall_filter_keywords');
    if (savedKeywords) {
        blacklistTextarea.value = decodeURIComponent(savedKeywords);
    }
    
    
    
    
    // Function to filter posts against list of keywords
    const filterPostsByKeywords = (blacklist) => {
        var blocked = 0
        var notBlocked = 0
            //const posts = document.querySelectorAll('.scaffold-finite-scroll .feed-shared-inline-show-more-text > [dir="ltr"]');
            
        let posts = document.querySelectorAll('[data-id]');
        console.log("posts.length",posts.length, lastPostCount);
        
        // Selector updated to 'article' to represent a generic post
        var filter_enabled = (lastPostCount == 0 || posts.length !== lastPostCount);
        if (filter_enabled) { // Only run the filter if there are new posts since the last count
            lastPostCount = posts.length;
            posts.forEach(post => {    
                //console.log(post.innerText)
                
                const postText = post.innerText.toLowerCase();
                //console.log("postText", postText)
                
                if(postText.length>2){
                    let shouldHidePost = blacklist.some(keyword => postText.includes(keyword));
                    console.log("shouldHidePost", shouldHidePost)
                    //post.style.display = shouldHidePost ? 'none' : ''; // Hide or show post based on the blacklist
                    post.style.border = shouldHidePost ? '1px solid orange' : '1px solid gray';
                    
                    
                    
                    //console.log(postNodeList);
                    // && undefined !== typeof postNodeList.length
                    
                    // && postNodeList.length < 2
                    if (shouldHidePost == true) {
                    
                        // Get the words from the textarea                    
                        let keywords = blacklistTextarea.value.split(',').map(word => word.trim().toLowerCase());
                        // Get the text to search in - replace this with the actual source of your target text
                        let searchText = postText.toLowerCase();
                        
                        // Count occurrences and list them
                        let results = keywords.reduce((acc, keyword) => {
                            let count = (searchText.match(new RegExp('\\b' + keyword + '\\b', 'g')) || []).length;
                            if (count > 0) {
                                acc[keyword] = (acc[keyword] || 0) + count;
                            }
                            return acc;
                        }, {});
                        
                            
                                            
                        //postNode.insertBefore(postNode.lastElementChild, blacklistUl);
                            
                        post.style.height = '100px'; // Hide or show post based on the blacklist
                        //post.style.visibility = 'hidden';  
                        
                        post.addEventListener("click", function(event) {
                            console.log("clicked");
                            //console.log(this);
                            this.style.height = '100%';                                
                            //this.style.visibility = 'visible';                            
                            var postHeader = this.querySelector('.update-components-actor');
                            if (undefined !== typeof postHeader ) {                            
                                postHeader.style.visibility = 'visible';
                            }
                        }, false); //event handler
                            
                        //var postHeader = post.closest('.update-components-actor');
                        var postHeader = post.querySelector('.update-components-actor');
                        //console.log("postHeader", postHeader);
                        if (null !== postHeader && "object" === typeof postHeader) {
                            postHeader.style.height = '1px';
                            postHeader.style.visibility = 'hidden';
                            //postHeader.style.border = '1px solid orange';
                            //postHeader.style.color = '#CACACA';                            
                            //postHeader.style.cssText = 'color:#CACACA !important';
                            //postHeader.setAttribute('style', 'color:#CACACA !important');
                            //postHeader.style.font = "normal 9px gray";
                            //postHeader.style.margin = "0 0 0 0";
                            //postHeader.style.padding = "0 0 0 0";    
                           
                        }
                        
                        
                        let blacklistUl = document.createElement('div');                        
                        //blacklistUl.innerHTML = Object.keys(results).map(word => `${word}(${results[word]}) `).join('');
                        blacklistUl.innerHTML = Object.keys(results).map(word => `${word}`).join(' ');
                        //blacklistUl.style.font = "normal 12px orange";
                        blacklistUl.style.color = "orange";
                        
                        
                        
                        let postNodeList = post.closest('div');
                        postNodeList.appendChild(blacklistUl);
                        
                        //let postNodeLast = postNodeList.lastElementChild;
                        let postNodeFirst = postNodeList.firstElementChild; 
                        postNodeList.insertBefore(postNodeFirst, null);
                        
                        
                        
                    }
                    
                    shouldHidePost? blocked++ : notBlocked++;
                }
            });
        }
        //console.log("blocked " ,blocked, notBlocked);
    };

    

    // Function to watch for new posts being added to the feed
    const observeFeedForChanges = () => {
        // Selector for LinkedIn feed or container where new posts are appended
        //const feed = document.querySelectorAll('.scaffold-finite-scroll .feed-shared-inline-show-more-text'); // This may not be the correct selector and could change
        const feed = document.querySelectorAll('[data-id]');

        if (feed) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.addedNodes.length > 0) {
                        mutation.addedNodes.forEach(addedNode => {
                            if (addedNode.nodeType === Node.ELEMENT_NODE) {
                                preFilter();
                            }
                        });
                    }
                });
            });

            // Observe the feed for added child elements
            observer.observe(feed, { childList: true, subtree: true });
        }
    };

    // Start observing the feed once it's available on the page
    const waitForFeed = setInterval(() => {
        preFilter();
    }, 1000);
    
//observeFeedForChanges();
    
    
    // Scroll event listener to check for new posts
    window.addEventListener('scroll', () => {
        // Throttle scroll handler to avoid running too frequently
        clearTimeout(scrollHandler);
        var scrollHandler = setTimeout(() => {
            //preFilter();
        }, 500);
    }, false);
    
    //preFilter();
    
})();
