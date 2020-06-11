import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import totalForm from "./totalForm";
import Common from "../utils/Common";

const { ccclass, property } = cc._decorator;

@ccclass
export default class endFormTT extends UIForm {

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Sprite)
    btnShareVideo: cc.Sprite = null;

    @property(cc.Sprite)
    btnNext: cc.Sprite = null;

    @property(cc.Sprite)
    btnReceive: cc.Sprite = null;

    @property(cc.Sprite)
    btnHome: cc.Sprite = null;

    @property(cc.Label)
    levelCoin: cc.Label = null;

    @property(cc.Label)
    txtMemo: cc.Label = null;

    public isMask: boolean = true;
    private mIsChecked: boolean = true;
    private mOpenVideo: boolean = true;


    public addEvent() {
        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnNext.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnShareVideo.node.on(cc.Node.EventType.TOUCH_END, this.onShareVideo, this)
        this.btnHome.node.on(cc.Node.EventType.TOUCH_END, this.onHome, this)
    }
    public removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnNext.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnShareVideo.node.off(cc.Node.EventType.TOUCH_END, this.onShareVideo, this)
        this.btnHome.node.off(cc.Node.EventType.TOUCH_END, this.onHome, this)
    }


    private onHome() {
        moosnow.form.showCoin({
            /**
             * Y方向的随机范围
             */
            randomY: 100,
            /**
            * X方向的随机范围
            */
            randomX: 100,
            /**
             * 金币图片数量
             */
            imgNum: 20,
            /**
             * 金币数量
             */
            coinNum: this.mLevelCoinNum * 5,
            /**
             * 开始位置
             */
            starVec: {
                x: 0,
                y: 0,
            },
            /**
             * 结束位置
             */
            endVec: {
                x: 100,
                y: 100,
            },
        }, () => {
            moosnow.ui.hideUIForm(UIForms.EndForm, null);
            moosnow.http.getMisTouchNum(misNum => {
                if (misNum == 0) {
                    moosnow.ui.pushUIForm(UIForms.HomeForm)
                }
                else {
                    moosnow.ui.pushUIForm(UIForms.MistouchForm)
                }
            })
        })
    }

    private onShareChange() {
        this.mIsChecked = !this.mIsChecked;
        this.mOpenVideo = !this.mOpenVideo;
        this.showBtn();

    }

    private showBtn() {
        if (this.mIsChecked) {
            this.checked.node.active = true;
        }
        else {
            this.checked.node.active = false;
        }
    }

    public mLevelCoinNum: number = 0;
    public mLevelShareCoinNum: number = 0;
    onShow(data) {
        let { coin, shareCoin } = data;
        this.mLevelCoinNum = coin;
        this.mLevelShareCoinNum = shareCoin
        this.levelCoin.string = `${Common.formatMoney(this.mLevelCoinNum)}`

        this.addEvent();
        moosnow.platform.showBanner();
        if (!moosnow.platform.isIphone())
            moosnow.form.showAd(moosnow.AD_POSITION.CENTER, () => { })

        this.btnShareVideo.node.active = true;
        this.btnShareVideo.node.runAction(
            cc.sequence(
                cc.rotateTo(0.1, 5),
                cc.rotateTo(0.1, -5),
                cc.rotateTo(0.1, 0),
            ).repeatForever()
        )
        this.mIsReceive = false;
        this.mOpenVideo = true;
        moosnow.http.getAllConfig(res => {
            if (res) {
                if (res.totalFormVideo == 1) {
                    this.showCheckedVideo();
                }
                else if (res.totalFormVideo == 2) {
                    this.showUnCheckedVideo();
                }
                else {
                    let precent = res && res.shareFormVideoPrecent ? parseFloat(res.shareFormVideoPrecent) : 0.5
                    if (Common.randomNumBoth(0, 100) / 100.0 < precent) {
                        this.showCheckedVideo();
                    }
                    else
                        this.showUnCheckedVideo();
                }
            }
            else {
                this.showCheckedVideo();
            }
        })
    }
    private showCheckedVideo() {
        this.mIsChecked = true;
        this.txtMemo.string = "看视频得5倍奖励";
        this.showBtn();
    }

    private showUnCheckedVideo() {
        this.mIsChecked = false;
        this.txtMemo.string = "不看视频得5倍奖励";
        this.showBtn();
    }


    willHide() {
        this.removeEvent();
        moosnow.platform.hideBanner();
    }
    onShareVideo() {


        moosnow.platform.share({
            channel: moosnow.SHARE_CHANNEL.VIDEO
        }, (res) => {
            if (res) {
                this.btnShareVideo.node.active = false;
            }
            else {
                moosnow.ui.showToast("分享未完成")
            }

            console.log('分享结束', res)
        });
    }


    private mIsReceive: boolean = false;
    public onReceive() {
        if (this.mIsReceive)
            return;
        this.mIsReceive = true;

        if (this.mOpenVideo) {
            moosnow.platform.showVideo(res => {
                this.mIsReceive = false;
                if (res == moosnow.VIDEO_STATUS.END) {
                    moosnow.form.showCoin({
                        /**
                         * Y方向的随机范围
                         */
                        randomY: 100,
                        /**
                        * X方向的随机范围
                        */
                        randomX: 100,
                        /**
                         * 金币图片数量
                         */
                        imgNum: 20,
                        /**
                         * 金币数量
                         */
                        coinNum: this.mLevelCoinNum * 5,
                        /**
                         * 开始位置
                         */
                        starVec: {
                            x: 0,
                            y: 0,
                        },
                        /**
                         * 结束位置
                         */
                        endVec: {
                            x: 100,
                            y: 100,
                        },
                    }, () => {
                        moosnow.ui.hideUIForm(UIForms.EndForm, null);
                        moosnow.http.getMisTouchNum(misNum => {
                            if (misNum == 0) {
                                moosnow.ui.pushUIForm(UIForms.HomeForm)
                            }
                            else {
                                moosnow.ui.pushUIForm(UIForms.MistouchForm)
                            }
                        })
                    })
                }
                else if (res == moosnow.VIDEO_STATUS.ERR) {
                    moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
                }
                else {
                    moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
                }
            })
        }
        else {
            this.onHome();
        }

    }

    onHide() {
        moosnow.platform.hideBanner();
        moosnow.form.showAd(moosnow.AD_POSITION.NONE, () => { })
    }


    // update (dt) {}
}
