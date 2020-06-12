import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import Common from "../utils/Common";
import showTotalOptions from "../../../../moosnowSdk/model/showTotalOptions";


const { ccclass, property } = cc._decorator;

@ccclass
export default class totalFormQQ extends UIForm {

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Sprite)
    btnVideoReceive: cc.Sprite = null;

    @property(cc.Sprite)
    btnReceive: cc.Sprite = null;

    @property(cc.Sprite)
    btnReceive2: cc.Sprite = null;

    @property(cc.Node)
    btnMore: cc.Node = null;

    @property(cc.Label)
    levelCoin: cc.Label = null;

    public get FormData(): showTotalOptions {
        return this.mFormData
    }

    public isMask: boolean = true;

    private mCheckedVideo: boolean = true;

    public addEvent() {
        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnReceive2.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnVideoReceive.node.on(cc.Node.EventType.TOUCH_END, this.onVideoReceive, this)
        this.btnMore.on(cc.Node.EventType.TOUCH_END, this.showAppbox, this)
    }
    public removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnReceive2.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnVideoReceive.node.off(cc.Node.EventType.TOUCH_END, this.onVideoReceive, this)
        this.btnMore.off(cc.Node.EventType.TOUCH_END, this.showAppbox, this)
    }

    private showAppbox() {
        moosnow.platform.showAppBox(() => { }, false);
        if (this.FormData && this.FormData.onMore)
            this.FormData.onMore();
    }
    private onVideoReceive() {
        moosnow.platform.showVideo(res => {
            if (res == moosnow.VIDEO_STATUS.END) {
                if (this.FormData.hideTotal) {
                    moosnow.ui.hideUIForm(UIForms.TotalForm, null)
                }
                if (this.FormData.showEnd) {
                    moosnow.form.showEnd(this.FormData.endOptions)
                }
                if (this.FormData && this.FormData.onVideoReceive)
                    this.FormData.onVideoReceive();
            }
            else if (res == moosnow.VIDEO_STATUS.ERR) {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
            }
            else {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
            }
        })
    }
    private onReceive() {
        if (this.FormData.hideTotal) {
            moosnow.ui.hideUIForm(UIForms.TotalForm, null)
        }
        if (this.FormData.showEnd) {
            moosnow.form.showEnd(this.FormData.endOptions)
        }
        if (this.FormData && this.FormData.onReceive)
            this.FormData.onReceive();
    }



    private onShareChange() {
        this.mCheckedVideo = !this.mCheckedVideo;
        this.changeUI();

    }

    private changeUI() {
        if (this.mCheckedVideo) {
            this.btnVideoReceive.node.active = true;
            this.btnReceive2.node.active = false
            this.checked.node.active = true;
        }
        else {

            this.btnVideoReceive.node.active = false;
            this.btnReceive2.node.active = true
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
        this.changeUI();
        this.mCheckedVideo = true;
        moosnow.platform.stopRecord();
        moosnow.platform.showBanner();
        moosnow.platform.showAppBox(res => {
            console.log('show app box call back res ', res)
        })
    }

    willHide() {
        this.removeEvent();
        moosnow.platform.hideBanner();
    }



    // update (dt) {}
}
