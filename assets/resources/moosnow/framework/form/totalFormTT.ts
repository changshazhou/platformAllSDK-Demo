import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import Common from "../utils/Common";
import showTotalOptions from "../../../../moosnowSdk/model/showTotalOptions";


const { ccclass, property } = cc._decorator;

@ccclass
export default class totalFormTT extends UIForm {

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Node)
    btnVideo: cc.Node = null;

    @property(cc.Node)
    btnReceive: cc.Node = null;

    @property(cc.Label)
    levelCoin: cc.Label = null;

    @property(cc.Label)
    txtMemo: cc.Label = null;

    public get FormData(): showTotalOptions {
        return this.mFormData
    }

    public isMask: boolean = true;
    private mIsChecked: boolean = true;
    private mOpenVideo: boolean = true;


    public addEvent() {
        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnVideo.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)

    }
    public removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.onShareChange, this);
        this.btnReceive.off(cc.Node.EventType.TOUCH_END, this.onReceive, this);
        this.btnVideo.off(cc.Node.EventType.TOUCH_END, this.onReceive, this);
    }


    private onShareChange() {
        this.mIsChecked = !this.mIsChecked;
        this.mOpenVideo = !this.mOpenVideo;
        this.changeUI();

    }

    private changeUI() {
        let lblReceive = this.btnReceive.getComponent(cc.Label)
        if (this.mIsChecked) {
            this.checked.node.active = true;
            lblReceive.string = "领取五倍奖励";

        }
        else {
            this.checked.node.active = false;
            lblReceive.string = "领取奖励";

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
        this.changeUI();
    }

    private showUnCheckedVideo() {
        this.mIsChecked = false;
        this.txtMemo.string = "不看视频得5倍奖励";
        this.changeUI();
    }


    willHide() {
        this.removeEvent();
        moosnow.platform.hideBanner();
    }


    public onVideo() {
        moosnow.platform.showVideo(res => {
            if (res == moosnow.VIDEO_STATUS.END) {
                this.onVideoReceive()
            }
            else if (res == moosnow.VIDEO_STATUS.ERR) {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
            }
            else {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
            }
        })
    }

    public onVideoReceive() {
        moosnow.platform.showVideo(res => {
            this.mIsReceive = false;
            if (res == moosnow.VIDEO_STATUS.END) {
                if (this.FormData.coinOptions) {
                    this.FormData.coinOptions.coinNum = this.FormData.videoNum;
                    this.FormData.coinOptions.callback = () => {
                        if (this.FormData.hideForm) {
                            moosnow.ui.hideUIForm(UIForms.TotalForm, null)
                        }
                        moosnow.http.getMisTouchNum(misNum => {
                            if (misNum == 0) {
                                if (this.FormData.endOptions) {
                                    moosnow.form.showEnd(this.FormData.endOptions)
                                }
                            }
                            else {
                                if (this.FormData.touchOptions)
                                    moosnow.form.showMistouch(this.FormData.touchOptions)
                            }
                        })
                    }
                    moosnow.form.showCoin(this.FormData.coinOptions)
                }
                else {
                    if (this.FormData.hideForm) {
                        moosnow.ui.hideUIForm(UIForms.TotalForm, null)
                    }
                    moosnow.http.getMisTouchNum(misNum => {
                        if (misNum == 0) {
                            if (this.FormData.endOptions) {
                                moosnow.form.showEnd(this.FormData.endOptions)
                            }
                        }
                        else {
                            moosnow.ui.pushUIForm(UIForms.MistouchForm)
                        }
                    })
                }

            }
            else if (res == moosnow.VIDEO_STATUS.ERR) {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
            }
            else {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
            }
        })
    }

    private mIsReceive: boolean = false;
    public onReceive() {
        if (this.mIsReceive)
            return;
        this.mIsReceive = true;

        if (this.mOpenVideo) {
            this.onVideoReceive();
        }
        else {
            let options = this.FormData.coinOptions;
            options.coinNum = this.FormData.coinNum;
            options.callback = () => {
                if (this.FormData.hideForm)
                    moosnow.ui.hideUIForm(UIForms.TotalForm, null);
                if (this.FormData.endOptions)
                    moosnow.form.showEnd(this.FormData.endOptions)
            }
            moosnow.form.showCoin(options)
        }
    }

    onHide() {
        moosnow.platform.hideBanner();
        moosnow.form.showAd(moosnow.AD_POSITION.NONE, () => { });
    }


    // update (dt) {}
}