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

        moosnow.http.getAllConfig(res => {
            console.log('所有配置', res)
        })
        // moosnow.form.loadAd({
        //     floatPositon: [{
        //         x: -496.015,
        //         y: -128
        //     }, {
        //         x: -183.045,
        //         y: 24
        //     }, {
        //         x: 434.285,
        //         y: 123
        //     }, {
        //         x: 592,
        //         y: 7
        //     }],
        //     floatTempletes: ["floatAdItem4"],
        //     hideForm: true,
        //     callback: () => {
        //         moosnow.form.showAd(moosnow.AD_POSITION.FLOAT, () => { }, [new cc.Vec2(-300, 0), new cc.Vec2(-100, 0), new cc.Vec2(100, 0), new cc.Vec2(300, 0)], ["floatAdItem4"]);
        //         // moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT | moosnow.AD_POSITION.EXPORT_FIXED, () => {

        //         // })
        //         // moosnow.form.showAd(moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.EXPORT_FIXED, () => {

        //         // })
        //         // moosnow.form.showAd(moosnow.AD_POSITION.BACK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.EXPORT, () => {
        //         //     console.log('点击了返回按钮')
        //         //     moosnow.form.showAd(moosnow.AD_POSITION.FLOAT | moosnow.AD_POSITION.BANNER, () => {
        //         //         console.log('点击了返回按钮')
        //         //     })
        //         // })
        //     }
        // })
        // let b = window["qq"].createBannerAd({
        //     adUnitId: "34c452729bdb7803449ea3ecb964adb5",
        //     style: {
        //         top: 50,
        //         left: 50,
        //         width: 320,
        //         height: 320 / 300 * 72.8071
        //     }
        // });
        // b.show();

        // // moosnow.form.showAd(moosnow.AD_POSITION.BANNER|moosnow.AD_POSITION.FLOAT,)

        // moosnow.event.addListener(moosnow.PLATFORM_EVENT.ON_BANNER_ERROR, this, () => {
        //     console.log('moosnow.PLATFORM_EVENT.ON_BANNER_ERROR')
        // })
        // moosnow.event.sendEventImmediately(moosnow.PLATFORM_EVENT.ON_BANNER_ERROR, null);



        // // if (moosnow.APP_PLATFORM.WX == moosnow.getAppPlatform() && window["wx"])
        // //     cc.loader.downloader.loadSubpackage('tex', (err) => {
        // //         if (err) {
        // //             return console.error(err);
        // //         }
        // //     });

        // moosnow.event.addListener(moosnow.PLATFORM_EVENT.ON_PLATFORM_HIDE, this, (res) => {
        //     console.log('平台隐藏时', res)
        // })
        // moosnow.event.addListener(moosnow.PLATFORM_EVENT.ON_PLATFORM_SHOW, this, (res) => {
        //     console.log('平台显示时', res)
        // })


        // moosnow.platform.createGameRecorderShareButton(
        //     'https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/SDK/guide/guide_error2.png',
        //     'https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/SDK/guide/guide_error2.png',
        //     {},
        //     () => {

        //     }
        // );

        moosnow.platform.preloadBanner(1);
    }

    showToast() {
        moosnow.form.showToast("这是一个Toast消息")
    }

    testHttp() {
        moosnow.http.request('https://cdn.liteplay.com.cn/config/wxeb720d78f75a425f.json', {}, 'GET', (res) => {
            console.log('testHttp success ', res)
        }, (res) => {
            console.log('testHttp error ', res)
        })
    }

    showMistouch() {
        moosnow.form.showMistouch({
            hideForm: true,
            url: "",
            coinNum: 500,
            callback: () => {
                console.log('callback')
            }
        })
    }


    showCoin() {

    }


    showShare() {
        moosnow.form.showShare({
            hideForm: true,
            shareCoinNum: 500,
            shareCallback: (res) => {
                console.log('shareCallback', res)
            },
            callback: () => {
                console.log('callback')
            }
        })


    }

    showPrize() {
        moosnow.form.showPrize({
            hideForm: true,
            logo: ""
        })
    }

    showPrize2() {

    }
    showAd4() {
        moosnow.form.showAd(moosnow.AD_POSITION.ROTATE | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK | moosnow.AD_POSITION.MASK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.TOP, () => { });
        })

    }
    showAd3() {
        moosnow.form.showAd(moosnow.AD_POSITION.EXPORT_FIXED | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT | moosnow.AD_POSITION.SIDE, () => {

            });
        });
    }

    showAd2() {
        moosnow.form.showAd(moosnow.AD_POSITION.LEFTRIGHT, () => {
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
        moosnow.form.showTotal({
            coinNum: 500,
            hideForm: true,
            videoText: "5倍视频领取",
            callback: () => {
                console.log('点继续游戏')
            },
            videoCallback: () => {
                console.log('看完视频后点继续游戏')
            }
        });
    }


    showRespawn() {

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
        }, 0)
    }
    showVideo2() {
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
        }, 1)
    }

    showBanner() {
        moosnow.platform.showBanner(false, () => { }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.BOTTOM, Math.random() > 0.5 ? 0 : 1);
    }

    showBottomBanner() {
        moosnow.platform.showBanner(false, () => { }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.BOTTOM);
    }
    showCenterBanner() {
        moosnow.platform.showBanner(false, () => { }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.CENTER);
    }
    showTopBanner() {
        moosnow.platform.showBanner(false, () => { }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.TOP);
    }


    showAutoBanner() {

        moosnow.platform.showAutoBanner(moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.BOTTOM, 1);

    }

    showIntervalBanner() {
        moosnow.platform.showIntervalBanner();
    }

    hideBanner() {
        moosnow.platform.hideBanner();
        moosnow.platform.clearIntervalBanner();
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
        if (moosnow.getAppPlatform() == moosnow.APP_PLATFORM.BYTEDANCE)
            moosnow.platform.stopRecord((res) => {
                if (res.videoPath) {
                    this.videoPath = res.videoPath
                }
            });
        else {
            moosnow.platform.stopRecord((res) => {
                // left = 10 表示居左10像素 类似 banner 中的left 
                moosnow.platform.showShareButton({
                    left: 0,
                    top: 0
                });

            });
        }
    }

    shareRecord() {
        moosnow.platform.share({
            channel: moosnow.SHARE_CHANNEL.VIDEO
        }, (res) => {
            console.log('分享结束', res)
        }, (err) => {
            console.log('视频太短', err)
        });
    }


    hideShareButton() {
        moosnow.platform.hideShareButton();
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

    showTry() {
        moosnow.form.showTry({
            skinUrl: "https://liteplay-1253992229.cos.ap-guangzhou.myqcloud.com/Game/demo/tryForm/7.png",
            hideForm: true,
            callback: () => {
                console.log('点继续游戏')
            },
            videoCallback: () => {
                console.log('看完视频后点继续游戏')
            }
        });
    }

    showEnd() {
        moosnow.form.showEnd({
            hideForm: true,
            callback: () => {
                console.log('点击了确认')
            }
        })
    }

    showPause() {
        moosnow.form.showPause({
            hideForm: true,
            callback: () => {
                console.log('点击了确认')
            }
        })
    }


    showSet() {
        moosnow.form.showSet({
            hideForm: true,
            vibrateCallback: () => {
                console.log('vibrateCallback')
            },
            musicCallback: () => {
                console.log('musicCallback')
            }
        });
    }

    showEgg() {
        moosnow.form.showBox({
            rowNum: 3,
            colNum: 3,
            coinNum: [100, 300],
            videoCoinNum: [100, 300],
            videoNum: [1, 5, 7],
            openCallback: (num) => {
                console.log('openCallback', num)
            },
            callback: () => {
                console.log('callback')
            },
            hideForm: true
        });
    }


    showNative() {
        moosnow.platform.showNativeAd((res) => {
            console.log("🚀 ~ file: Helloworld.ts ~ line 436 ~ Helloworld ~ moosnow.platform.showNativeAd ~ res", res)
        });
    }

    showCustomBanner() {
        moosnow.platform.showBanner(false, () => { }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.BOTTOM, 0, {
            left: 0,
            top: 0,
            width: 320,
            height: 210
        })
    }
}
