const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start() {
        // init logic
        this.label.string = this.text;
    }

    showVideo() {
        moosnow.platform.showVideo(res => {
            switch (res) {
                case moosnow.VIDEO_STATUS.NOTEND:
                    console.log('视频未观看完成 ')
                    break;
                case moosnow.VIDEO_STATUS.ERR:
                    console.log('获取视频错误 ')
                    break;
                case moosnow.VIDEO_STATUS.END:
                    console.log('观看视频结束 ')
                default:
                    break;
            }
        })
    }

    showBanner() {
        moosnow.platform.showBanner();
    }

    showBottomBanner() {
        moosnow.platform.showBanner(() => { }, moosnow.BANNER_POSITION.BOTTOM);
    }
    showCenterBanner() {
        moosnow.platform.showBanner(() => { }, moosnow.BANNER_POSITION.CENTER);
    }
    showTopBanner() {
        moosnow.platform.showBanner(() => { }, moosnow.BANNER_POSITION.TOP);
    }

    showAutoBanner() {
        moosnow.platform.showAutoBanner();

    }

    hideBanner() {
        moosnow.platform.hideBanner();
    }

    showBox() {
        moosnow.platform.showAppBox();
    }


    startRecord() {
        moosnow.platform.startRecord();
    }
    private videoPath: string = "";
    stopRecord() {
        moosnow.platform.stopRecord((res) => {
            if (res.videoPath) {
                this.videoPath = res.videoPath
                // setTimeout(() => {
                //     this.shareRecord();
                // }, 200);
            }
        });
    }

    shareRecord() {
        moosnow.platform.share({
            channel: moosnow.SHARE_CHANNEL.VIDEO
        }, (res) => {
            console.log('分享结束', res)
        });
    }



    showInter() {
        moosnow.platform.showInter();
    }

    navigate2Mini() {
        moosnow.navigate2Mini({
            appid: "30238187",
            atlas: "",
            boxAppid: "",
            desc: "",
            img: "https://txcdn.ylll111.xyz/more_channel/6fb282c9ba4a7f6859f6d26c70335c58.png",
            path: "",
            pkgName: "com.cszs.qscssd.nearme.gamecenter",
            title: "枪神传说3D",
        }, () => { }, () => {

        })
    }
}
