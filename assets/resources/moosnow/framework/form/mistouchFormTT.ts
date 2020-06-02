import UIForm from "../../framework/ui/UIForm";
import Common from "../../utils/Common";
import UIForms from "../../config/UIForms";
import EventType from "../../utils/EventType";
import { AdType } from "../../enum/AdType";
import { BannerClickType } from "../../enum/BannerClickType";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MistouchFormTT extends UIForm {

    @property(cc.ProgressBar)
    clickProgress: cc.ProgressBar = null;

    @property(cc.Node)
    btnReceive: cc.Node = null;

    @property(cc.Node)
    btnConfirm: cc.Node = null;

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Node)
    step1: cc.Node = null;

    @property(cc.Node)
    step2: cc.Node = null;

    @property(cc.Node)
    logo: cc.Node = null;


    private mMaxNum: number = 10;
    private mCurrentNum: number = 0;
    private mOpenVideo: boolean = true;
    willShow(data) {

        super.willShow(data);

        this.step1.active = true;
        this.step2.active = false;
        this.btnConfirm.active = true;

        this.mCurrentNum = 0;
        this.mOpenVideo = true;
        this.showCheckbox();
        this.addEvent();
        this.schedule(this.subProgress, 0.1)
        Lite.event.sendEventImmediately(EventType.ADFORM_CHANGE, {});

    }
    willHide() {
        this.unschedule(this.subProgress)
        this.unschedule(this.resetProgress)
        this.removeEvent();

    }

    private subProgress() {
        if (this.mCurrentNum > 0)
            this.mCurrentNum -= 0.1
    }
    private addEvent() {

        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.checkboxChange, this)
        this.btnReceive.on(cc.Node.EventType.TOUCH_START, this.onLogoUp, this)
        this.btnReceive.on(cc.Node.EventType.TOUCH_END, this.onBannerClick, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
        this.btnConfirm.on(cc.Node.EventType.TOUCH_END, this.openBox, this)


    }

    private removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.checkboxChange, this)
        this.btnReceive.off(cc.Node.EventType.TOUCH_START, this.onLogoUp, this)
        this.btnReceive.off(cc.Node.EventType.TOUCH_END, this.onBannerClick, this)
        this.node.off(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
        this.btnConfirm.off(cc.Node.EventType.TOUCH_END, this.openBox, this)
    }

    private openBox() {
        if (this.mOpenVideo) {
            this.btnConfirm.active = false;
            moosnow.platform.showVideo(res => {
                if (res == moosnow.VIDEO_STATUS.END) {
                    Common.addCoin(this.node, Common.randomNumBoth(500, 600), () => {
                        Lite.ui.hideUIForm(UIForms.MistouchForm, null);
                        Lite.ui.pushUIForm(UIForms.HomeForm)
                    })
                    return;
                }
                else if (res == moosnow.VIDEO_STATUS.NOTEND) {
                    Lite.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
                }
                else {
                    Lite.ui.showToast(moosnow.VIDEO_MSG.ERR)
                }

                this.btnConfirm.active = true;
            })
        }
        else {
            Lite.ui.hideUIForm(UIForms.MistouchForm, null);
            Lite.ui.pushUIForm(UIForms.HomeForm)
        }
    }


    private checkboxChange() {
        this.mOpenVideo = !this.mOpenVideo;
        this.showCheckbox();
    }
    private showCheckbox() {
        if (this.mOpenVideo) {
            this.checked.node.active = true;
        }
        else {
            this.checked.node.active = false;
        }
    }
    private stopPropagation(e: cc.Event.EventTouch) {
        e.stopPropagation();
    }

    private playBoxAnim(animName) {
        let anim = this.logo.getComponent(cc.Animation);
        if (!anim.getAnimationState(animName).isPlaying)
            anim.play(animName)
    }

    private onLogoUp() {
        // this.logo.position = this.mEndPos;
        this.playBoxAnim("prizeBox2")
    }
    private onBannerClick() {
        if (this.mCurrentNum > this.mMaxNum + 1)
            return;
        this.mCurrentNum += 1;

        if (this.mCurrentNum >= this.mMaxNum) {
            this.step1.active = false;
            this.step2.active = true;
            this.playBoxAnim("prizeBox1")
        }
    }

    private resetProgress() {
        this.mCurrentNum = 0;
    }


    update() {
        let progress = this.mCurrentNum / this.mMaxNum;
        this.clickProgress.progress = progress > 1 ? 1 : progress
    }

}
