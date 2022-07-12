
from TiktokApi import *

api_key = '' #your api key
ApiNWM = TiktokNWM(api_key=api_key)
video = ApiNWM.get_video_by_url('https://www.tiktok.com/@radamaro/video/6959254778593512706')
url_video = video['items'][0]['video']['playAddr']
download = Download({}, 'video')
download.downloadVideo(url_video)