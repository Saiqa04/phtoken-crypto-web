export function PageTitle(data = {}){
    data.title =  data.title || "Racoins | Listing & Coin voting platform";
    data.description  =  data.description || "Finding new crypto gems made easy with Racoins.cc";

    document.title = data.title;
    document.querySelector('meta[name="description"]').setAttribute('content', data.description);
}