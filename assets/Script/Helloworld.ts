import UIForms from "../resources/moosnow/config/UIForms";

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

        moosnow.form.preloadAd();

        // if (moosnow.APP_PLATFORM.WX == moosnow.getAppPlatform())
        //     cc.loader.downloader.loadSubpackage('tex', (err) => {
        //         if (err) {
        //             return console.error(err);
        //         }
        //     });

    }

    showToast() {
        moosnow.form.showToast("这是一个Toast消息")
    }


    showMistouch() {
        let options = new moosnow.showOptions.touchOptions();
        options.type = 2;
        options.callback = () => {

        }

        moosnow.form.showMistouch(options);
    }


    showCoin() {
        let options = new moosnow.showOptions.coinOptions();
        options.coinNum = 500;
        options.callback = () => {
            console.log('金币动画完成')
        }
        moosnow.form.showCoin(options)
    }


    showShare() {
        let options = {
            shareCoinNum: 500,
            hideForm: true,
            shareCallback: (shared) => {

            },
            videoCallback: (shared) => {

            }
        }
        moosnow.form.showShare(options)
    }

    showPrize() {

        let coinOptions = new moosnow.showOptions.coinOptions();
        coinOptions.coinNum = 500;
        coinOptions.callback = () => {
            console.log('金币动画完成2')
        }


        let options = new moosnow.showOptions.prizeOptions();
        options.callback = () => {
            console.log('奖励完成')
        }
        options.showCoinAnim = true;
        options.coinOptions = coinOptions;

        moosnow.form.showPrize(options)
    }

    showPrize2() {
        let options = new moosnow.showOptions.prizeOptions();
        options.callback = () => {
            console.log('奖励完成')
        }
        options.showCoinAnim = false;
        moosnow.form.showPrize(options)
    }

    showAd3() {
        moosnow.form.showAd(moosnow.AD_POSITION.EXPORT_FIXED | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT | moosnow.AD_POSITION.SIDE, () => {

            });
        });
    }

    showAd2() {
        moosnow.form.showAd(moosnow.AD_POSITION.CENTER | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT | moosnow.AD_POSITION.SIDE, () => {

            });
        });
    }

    showAd() {
        moosnow.form.showAd(moosnow.AD_POSITION.EXPORT | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT | moosnow.AD_POSITION.SIDE, () => {

            });
        });
    }

    showTotal() {
        let touchOptions = {
            type: 1,
            onCompleted: () => {
                console.log("误触页-结束")
            }
        }
        let endOptions = {
            coinNum: 0,
            videoNum: 0,
            shareCoinNum: 0,
            isWin: true,
            hideEnd: true,
            level: "1",
            extraData: {},
            touchOptions: touchOptions,
            onReceive: () => {
                console.log("结束页-点了领取")
            },
            onVideoReceive: () => {
                console.log("结束页-点了视频领取")
            },
        }

        moosnow.form.showTotal({
            coinNum: 500,
            videoNum: 2500,
            shareCoinNum: 500,
            hideTotal: true,
            showEnd: true,
            endOptions: endOptions,
            onReceive: () => {
                console.log("点了领取")
            },
            onVideoReceive: () => {
                console.log("点了视频领取")
            },
            onMore: () => {
                console.log("点了更多游戏")
            },
            extraData: {}
        })
    }


    showRespawn() {
        moosnow.ui.pushUIForm(UIForms.RespawnForm, { coin: 500, shareCoin: 1000 })
    }


    hideAd() {
        moosnow.form.showAd(moosnow.AD_POSITION.NONE, null);
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

    showIntervalBanner() {
        moosnow.platform.showIntervalBanner();

        this.scheduleOnce(() => {
            moosnow.platform.clearIntervalBanner();
        }, 20)
    }

    hideBanner() {
        moosnow.platform.hideBanner();
    }

    showBox() {
        moosnow.platform.showAppBox(() => {
            console.log('关闭盒子')
        });
    }

    showNativeBanner() {
        // console.log('moosnow.platform.moosnowConfig.bannerId', moosnow.platform.moosnowConfig.bannerId)

        // const bannerAd = qq.createBannerAd({
        //     adUnitId: '393fd2c197f4fdda1f9729ef36737890',
        //     style: {
        //         top: 0,
        //         width: 320,
        //         height: 100,
        //         left: 0
        //     }
        // })
        // // 尺寸调整时会触发回调         
        // // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！    
        // bannerAd.onResize(size => {
        //     console.log('Resize后正式宽高:', size.width, size.height);
        //     // 在这里可以根据banner宽高进行定位        
        //     // bannerAd.style.top = 76;
        //     // bannerAd.style.left = 320;


        // });
        // bannerAd.onError(res => { console.log('bannerAd onError', res) })
        // bannerAd.onLoad(res => {
        //     console.log('bannerAd onLoad', res)
        //     bannerAd.show().then(() => {
        //         console.log('bannerAd show ok')
        //     }).catch((res) => {
        //         console.log('bannerAd show error', res)
        //     });
        // })
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
        // let row = {
        //     appid: "30238187",
        //     atlas: "",
        //     boxAppid: "",
        //     desc: "",
        //     img: "https://txcdn.ylll111.xyz/more_channel/6fb282c9ba4a7f6859f6d26c70335c58.png",
        //     path: "",
        //     pkgName: "com.cszs.qscssd.nearme.gamecenter",
        //     title: "枪神传说3D",
        // }
        // moosnow.platform.navigate2Mini(row, () => {

        // }, () => {

        // }, () => {

        // })
    }
}
