import UIForm from "../../framework/ui/UIForm";
import Common from "../../utils/Common";
import UIForms from "../../config/UIForms";
import EventType from "../../utils/EventType";
import { AdType } from "../../enum/AdType";
import { BannerClickType } from "../../enum/BannerClickType";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MistouchFormQQ extends UIForm {

    @property(cc.ProgressBar)
    clickProgress: cc.ProgressBar = null;

    @property(cc.Node)
    btnBanner: cc.Node = null;

    @property(cc.Node)
    logo: cc.Node = null;


    @property(cc.Node)
    hand: cc.Node = null;

    @property(cc.SpriteFrame)
    pinch1: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch3: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch4: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch5: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    pinch6: cc.SpriteFrame = null;


    private mMaxNum: number = 10;
    private mCurrentNum: number = 0;
    private mNavigateIndex: number = 0;
    private mBannerShow: boolean = false;
    private mShowTime: number = 0;


    private mBannerClickType: BannerClickType = BannerClickType.AUTO_HIDE;

    willShow(data) {

        super.willShow(data);

        this.btnBanner.active = true;



        this.mCurrentNum = 0;
        this.mNavigateIndex = Common.randomNumBoth(3, this.mMaxNum - 2);
        this.addEvent();
        this.schedule(this.subProgress, 0.016)
        Lite.event.sendEventImmediately(EventType.ADFORM_CHANGE, {});


        this.mBannerShow = false;

        // moosnow.http.getAllConfig(res => {
        //     if (res && res.bannerClickType)
        //         this.mBannerClickType = res.bannerClickType
        //     // this.mBannerClickType = BannerClickType.MAST;
        // })


        if (this.mistouchAppBox()) {
            this.hand.active = true;
            let anim = this.hand.getComponent(cc.Animation);
            anim.play();
        }
        moosnow.platform.hideBanner();
    }
    willHide() {
        this.unschedule(this.subProgress)
        this.unschedule(this.resetProgress)
        this.removeEvent();



    }

    private subProgress() {
        if (this.mCurrentNum > 0)
            this.mCurrentNum -= 0.02
    }
    private addEvent() {
        //误触appbox 广告
        if (this.mistouchAppBox()) {
            this.btnBanner.active = false;
            this.logo.on(cc.Node.EventType.TOUCH_START, this.onLogoUp, this);
            this.logo.on(cc.Node.EventType.TOUCH_END, this.onBannerClick, this);
        }
        else {
            //误触banner
            this.btnBanner.active = true;
            this.btnBanner.on(cc.Node.EventType.TOUCH_START, this.onLogoUp, this);
            this.btnBanner.on(cc.Node.EventType.TOUCH_END, this.onBannerClick, this);
        }

        this.node.on(cc.Node.EventType.TOUCH_END, this.stopPropagation, this);
        Lite.event.addListener(EventType.ON_PLATFORM_SHOW, this, () => {
            if (this.mBannerShow)
                this.bannerClickCallback(true);
        })
    }


    private bannerClickCallback(isOpend) {
        if (isOpend) {
            this.unschedule(this.onHideBanner);
            this.unschedule(this.resetProgress);
            if (this.mistouchAppBox()) {
                moosnow.platform.hideAppBox(()=>{
                    this.showPrize();
                });
            }
            else {
                moosnow.platform.hideBanner();
                this.showPrize();
            }

        }
    }

    private showPrize() {

        this.mBannerShow = false;
        if ((this.FormData.level) <= Lite.data.getCurrentLevel()) {
            let coinNum = Common.randomNumBoth(500, 600);
            if ((this.FormData.level) <= Lite.data.getCurrentLevel()) {
                Lite.ui.pushUIForm(UIForms.PrizeForm, {
                    coinNum,
                    level: this.FormData.level,
                    ...Common.deepCopy(this.FormData)
                }, () => {
                    Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
                })

                console.log('onOpendLevel', this.FormData.level)
            }
            console.log('onOpendLevel', this.FormData.level)


        }
        else
            Lite.ui.destroyUIForm(UIForms.MistouchForm, null)

    }


    private removeEvent() {
        this.btnBanner.off(cc.Node.EventType.TOUCH_START, this.onLogoUp, this);
        this.btnBanner.off(cc.Node.EventType.TOUCH_END, this.onBannerClick, this);

        this.logo.off(cc.Node.EventType.TOUCH_START, this.onLogoUp, this);
        this.logo.off(cc.Node.EventType.TOUCH_END, this.onBannerClick, this);

        this.node.off(cc.Node.EventType.TOUCH_END, this.stopPropagation, this)
        Lite.event.removeListener(EventType.ON_PLATFORM_SHOW, this);
    }

    private stopPropagation(e: cc.Event.EventTouch) {
        e.stopPropagation();
    }
    private onLogoUp() {
        // this.logo.position = this.mEndPos;
        this.logo.getComponent(cc.Sprite).spriteFrame = this.pinch4
    }
    private onLogoDown() {
        // this.logo.position = this.mBeginPos;
        this.logo.getComponent(cc.Sprite).spriteFrame = this.pinch3
    }

    private mistouchAppBox() {
        return this.FormData && this.FormData.mistouchType == 4
    }

    private onBannerClick() {
        this.onLogoDown();
        this.hand.active = false;
        this.mCurrentNum += 1;

        if (this.mCurrentNum >= this.mNavigateIndex) {
            if (!this.mBannerShow) {
                this.mShowTime = Date.now();
                this.mBannerShow = true;
                if (this.mistouchAppBox()) {
                    moosnow.platform.showAppBox(() => {
                        this.bannerClickCallback(true);
                    })
                }
                else {
                    moosnow.platform.showBanner((e) => {
                        console.log('banner click callback ', e)
                        this.bannerClickCallback(e);
                    });

                }


                if (this.mBannerClickType == BannerClickType.AUTO_HIDE) {
                    this.unschedule(this.onHideBanner)
                    this.scheduleOnce(this.onHideBanner, 2)
                }
                else if (this.mBannerClickType == BannerClickType.MAST) {
                    this.unschedule(this.resetProgress)
                    this.scheduleOnce(this.resetProgress, 2)
                }

            }
        }
        if (this.mCurrentNum >= this.mMaxNum) {
            moosnow.platform.hideBanner();
            this.mBannerShow = false;
            Lite.ui.destroyUIForm(UIForms.MistouchForm, null)
            let coinNum = Common.randomNumBoth(500, 600);
            if ((this.FormData.level) <= Lite.data.getCurrentLevel()) {
                Lite.ui.pushUIForm(UIForms.PrizeForm, {
                    coinNum,
                    level: this.FormData.level,
                    ...Common.deepCopy(this.FormData)
                }, () => {
                })

                console.log('onOpendLevel', this.FormData.level)
            }

        }
    }

    private resetProgress() {
        this.mCurrentNum = 0;
        moosnow.platform.hideBanner();
        this.mBannerShow = false;
    }

    private onHideBanner() {
        if (this.mistouchAppBox())
            moosnow.platform.hideAppBox();
        else
            moosnow.platform.hideBanner();

    }

    update() {
        this.clickProgress.progress = this.mCurrentNum / this.mMaxNum
    }

}
