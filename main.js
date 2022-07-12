const { default: axios } = require('axios');
var express = require('express');
const path = require('path');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'))
});

app.post('/get-video', async function(req, res){
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
    };
    let tiktokStorage = 'aweme';
    let tikTok = 'tiktok';
    tikTok = tikTok + 'v' + '.com';
    const video_url = req.body.video_url;
    let video_url_array = video_url.split('/');
    console.log(video_url_array[5]);

    const video_id = video_url_array[5];

    var sendURL = "https://api."+tikTok+"/aweme/v1/multi/"+tiktokStorage+"/detail/?"+tiktokStorage+"_ids=%5B" + video_id + "%5D";
    const result = await axios.get(sendURL, {
        headers: headers
    });
    var data = result.data.aweme_details;
    var url_list = data[0].video.play_addr.url_list;
    res.json({url : url_list[0]});
    res.end();
});

app.listen(3000, function () {
  console.log('TikTok Scraper listening on port 3000!');
});