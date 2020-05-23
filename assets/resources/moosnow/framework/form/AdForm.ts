
import AdViewItem from "./AdViewItem";
import UIForm from "../ui/UIForm";
import EntityLogic from "../entity/EntityLogic";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AdForm extends UIForm {


    @property(cc.Node)
    public pauseContainer: cc.Node = null;

    @property(cc.ScrollView)
    public pauseView: cc.ScrollView = null;

    @property(cc.Layout)
    public pauseLayout: cc.Layout = null;


    @property(cc.Node)
    public centerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public centerView: cc.ScrollView = null;

    @property(cc.Layout)
    public centerLayout: cc.Layout = null;


    @property(cc.Node)
    public exportContainer: cc.Node = null;

    @property(cc.ScrollView)
    public exportView: cc.ScrollView = null;

    @property(cc.Layout)
    public exportLayout: cc.Layout = null;

    @property(cc.Node)
    public exportClose: cc.Node = null;

    @property(cc.Node)
    public exportMask: cc.Node = null;



    @property(cc.Node)
    public exportCloseTxt: cc.Node = null;

    @property(cc.Node)
    public floatContainer: cc.Node = null;

    @property(cc.Node)
    public floatFull: cc.Node = null;



    @property(cc.Node)
    public bannerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public bannerView: cc.ScrollView = null;

    @property(cc.Layout)
    public bannerLayout: cc.Layout = null;




    @property(cc.Node)
    public endContainer: cc.Node = null;

    @property(cc.ScrollView)
    public endView: cc.ScrollView = null;

    @property(cc.Layout)
    public endLayout: cc.Layout = null;


    @property(cc.Node)
    public failContainer: cc.Node = null;

    @property(cc.ScrollView)
    public failView: cc.ScrollView = null;

    @property(cc.Layout)
    public failLayout: cc.Layout = null;


    @property(cc.Node)
    public gameOverContainer: cc.Node = null;

    @property(cc.ScrollView)
    public gameOverView: cc.ScrollView = null;

    @property(cc.Layout)
    public gameOverLayout: cc.Layout = null;




    @property(cc.Node)
    public respawnContainer: cc.Node = null;

    @property(cc.ScrollView)
    public respawnScrollView: cc.ScrollView = null;

    @property(cc.Layout)
    public respawnLayout: cc.Layout = null;





    @property(cc.Node)
    public playerDiedContainer: cc.Node = null;

    @property(cc.ScrollView)
    public playerDiedScrollView: cc.ScrollView = null;

    @property(cc.Layout)
    public playerDiedLayout: cc.Layout = null;




    @property(cc.Node)
    public leftContainer: cc.Node = null;

    @property(cc.ScrollView)
    public leftView: cc.ScrollView = null;

    @property(cc.Layout)
    public leftLayout: cc.Layout = null;

    @property(cc.ScrollView)
    public rightView: cc.ScrollView = null;

    @property(cc.Layout)
    public rightLayout: cc.Layout = null;

    @property(cc.Node)
    public drawerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public drawerView: cc.ScrollView = null;

    @property(cc.Layout)
    public drawerLayout: cc.Layout = null;

    @property(cc.Node)
    public drawerShow: cc.Node = null;

    @property(cc.Node)
    public drawerHide: cc.Node = null;



    public isMask: boolean = false;
    public isPopEffect: boolean = false;
    private mAdItemList: Array<AdViewItem> = [];



    private mAdListBannerItem = "adListBannerItem"
    private mAdListCenterItem = "adListCenterItem"
    private mAdListExportItem = "adListExportItem"
    private mAdListLeftItem = "adListLeftItem"
    private mAdFloatLeftItem1 = "adFloatLeftItem1"
    private mAdFloatLeftItem2 = "adFloatLeftItem2"
    private mAdFloatLeftItem3 = "adFloatLeftItem3"
    private mAdListEndItem1 = "adListEndItem"

    constructor() {
        super();
    }

    private initLeftRightAd() {
        let source = this.mAdData.indexLeft;
        let endNum = source.length / 2
        let right = source.slice(0, endNum)
        let left = source.slice(endNum, source.length)

        right = this.setPosition(right, "右边单条");
        left = this.setPosition(left, "左边单条");

        this.initView(this.leftView, this.leftLayout, left, this.mAdListBannerItem);
        this.initView(this.rightView, this.rightLayout, left, this.mAdListBannerItem);

    }
    private initBannerAd() {
        let banner = this.setPosition(this.mAdData.indexLeft, "首页Banner");
        this.initView(this.bannerView, this.bannerLayout, banner, this.mAdListBannerItem);
    }

    private initExportAd() {
        let banner = this.setPosition(this.mAdData.indexLeft, "首页跳转取消后导出");
        this.initView(this.exportView, this.exportLayout, banner, this.mAdListExportItem);
    }

    private initRespawnAd() {
        let banner = this.setPosition(this.mAdData.indexLeft, "复活页");
        this.initView(this.respawnScrollView, this.respawnLayout, banner, this.mAdListBannerItem);
    }
    private initPlayerDiedAd() {
        let banner = this.setPosition(this.mAdData.indexLeft, "死亡后的导出页");
        this.initView(this.playerDiedScrollView, this.playerDiedLayout, banner, this.mAdListExportItem);
    }

    private initPauseAd() {
        let banner = this.setPosition(this.mAdData.indexLeft, "暂停页导出页");
        this.initView(this.pauseView, this.pauseLayout, banner, this.mAdListExportItem);
    }

    private initEndExport() {
        let banner = this.setPosition(this.mAdData.indexLeft, "结束页导出");
        this.initView(this.endView, this.endLayout, banner, this.mAdListBannerItem);
    }


    private setPosition(source: Array<moosnowAdRow>, position: string = ""): Array<moosnowAdRow> {
        let retValue = moosnow.Common.deepCopy(source) as [];
        retValue.forEach((item: moosnowAdRow) => {
            item.position = position;
        })
        return retValue;
    }


    private mEndLogic: Array<EntityLogic> = [];
    private initGameOverExport(isWin: boolean = false) {
        if (!this.mAdData)
            return;

        if (this.mEndLogic) {
            for (let i = 0; i < this.mEndLogic.length; i++) {
                moosnow.entity.hideEntity(this.mEndLogic[i], {});
            }
            this.mEndLogic = [];
        }

        let banner = this.mAdData ? [...this.mAdData.indexLeft] : [];

        let endAd: Array<moosnowAdRow> = [];
        let showAppId = []
        for (let i = 0; i < 6; i++) {
            let adItem = banner.splice(moosnow.Common.randomNumBoth(0, banner.length - 1), 1)[0]
            let item = moosnow.Common.deepCopy(adItem) as moosnowAdRow;
            showAppId.push(item.appid)
            endAd.push(item);
        }
        endAd.forEach(item => {
            let adRow = moosnow.Common.deepCopy(item);
            let rowData = {
                ...adRow,
                showAppId,
                source: banner,
                position: (isWin ? '胜利' : '失败') + "游戏结束页HOT三秒"
            }
            let logic = moosnow.entity.showEntity(this.mAdListEndItem1, this.gameOverLayout.node, rowData) as AdViewItem;
            this.mEndLogic.push(logic)
        })

    }


    private mFloatIndex = 0;
    private mFloatRefresh = 3;
    private mFloatCache = {};

    private floatCancel() {
        console.log('跳转取消回调')
        moosnow.form.showAd({
            showAd: moosnow.AD_POSITION.EXPORT | moosnow.AD_POSITION.BACK,
            callback: () => {
                moosnow.form.showAd({
                    showAd: moosnow.AD_POSITION.BANNER | moosnow.AD_POSITION.FLOAT,
                    callback: () => {
                    }
                })
            }
        })
    }
    private initFloatAd() {
        let source = this.mAdData.indexLeft;
        let items = [this.mAdFloatLeftItem1, this.mAdFloatLeftItem2, this.mAdFloatLeftItem1, this.mAdFloatLeftItem3];
        this.floatContainer.children.forEach((item, idx) => {
            if (item.name.indexOf('ad') != -1) {
                let showIndex = idx  //Common.randomNumBoth(0, this.mAdData.indexLeft.length - 1);
                let adRow = { ...source[showIndex], position: "首页浮动" }
                let itemName = items.length - 1 >= idx ? items[idx] : items[0];



                if ([1, 3].indexOf(idx) != -1) {
                    adRow.onCancel = this.floatCancel
                }

                let logic = moosnow.entity.showEntity(itemName, item, adRow);
                this.mFloatCache[idx] = {
                    index: showIndex,
                    logic: logic,
                    onCancel: adRow.onCancel
                };
                this.floatAnim(item);
            }
        })
        this.updateFloat();
        this.schedule(this.updateFloat, this.mFloatRefresh)
    }

    private floatAnim(floatNode) {
        floatNode.runAction(
            cc.sequence(
                cc.rotateTo(0.3, 10),
                cc.rotateTo(0.6, -10),
                cc.rotateTo(0.3, 0),
                cc.scaleTo(0.3, 0.8),
                cc.scaleTo(0.3, 1)
            ).repeatForever()
        )
    }


    private updateFloat() {

        for (let key in this.mFloatCache) {
            let showIndex = this.mFloatCache[key].index;
            let logic = this.mFloatCache[key].logic;
            if (showIndex < this.mAdData.indexLeft.length - 1)
                showIndex++;
            else
                showIndex = 0;
            this.mFloatCache[key].index = showIndex;

            logic.refreshImg({ ...this.mAdData.indexLeft[showIndex], onCancel: this.mFloatCache[key].onCancel });

        }

    }

    private mScrollVec = [];
    /**
   * 
   * @param panel 
   * @param source 
   * @param colSize 
   */
    private initView(scrollView: cc.ScrollView, layout: cc.Layout, source: Array<moosnowAdRow>, entityName?: string) {

        if (!entityName)
            entityName = this.mAdListBannerItem
        let width = 0;
        let height = 0;

        let itemWidth = 0;
        let itemHeight = 0

        source.forEach((item, idx) => {
            let adItemCtl = moosnow.entity.showEntity(entityName, layout.node, item);
            let itemNode = adItemCtl.node
            itemWidth = itemNode.width;
            itemHeight = itemNode.height;
            width += itemNode.width;
            height += itemNode.height;
            this.mAdItemList.push(adItemCtl);
        })

        let contentPos = scrollView.getContentPosition()
        if (layout.type == cc.Layout.Type.GRID) {

            height = 0;
            width = 0;
            if (scrollView.vertical) {
                let horizontalNum = Math.floor((scrollView.content.width - layout.paddingLeft - layout.paddingRight) / (itemWidth + layout.spacingX))
                let rowNum = Math.ceil((source.length / horizontalNum))
                height += rowNum * (itemHeight + layout.spacingY) + layout.paddingTop + layout.paddingBottom
                if (height > scrollView.node.height)
                    layout.node.height = height;

                let maxH = (height - scrollView.content.parent.height + layout.paddingTop + layout.paddingBottom) / 2;

                scrollView.setContentPosition(new cc.Vec2(contentPos.x, -maxH))
                // scrollView.getContentPosition
                this.mScrollVec.push({
                    maxH,
                    scrollView,
                    move2Up: false
                })
            }
            else {
                //竖直方向的数量
                let verticalNum = Math.floor((scrollView.content.height - layout.paddingTop - layout.paddingRight) / (itemHeight))
                //需要多少列
                let colNum = Math.ceil((source.length / verticalNum))
                //总宽度
                width = colNum * (itemWidth + layout.spacingX) + layout.paddingLeft + layout.paddingRight
                //能位移的宽度
                let maxW = (width - scrollView.content.parent.width + layout.paddingLeft + layout.paddingRight) / 2;
                if (maxW == 0)
                    debugger
                scrollView.setContentPosition(new cc.Vec2(-maxW, contentPos.y))
                this.mScrollVec.push({
                    maxW,
                    scrollView,
                    move2Left: false
                })
                // panel.width = width;

                // scrollView.scrollToBottomRight(3)
            }


        }
        else if (layout.type == cc.Layout.Type.HORIZONTAL) {

            width += (source.length - 2) * layout.spacingX + layout.paddingLeft + layout.paddingRight;
            let maxW = (width - scrollView.content.parent.width + layout.paddingLeft + layout.paddingRight) / 2
            scrollView.setContentPosition(new cc.Vec2(-maxW, contentPos.y))
            scrollView.getContentPosition
            this.mScrollVec.push({
                maxW,
                scrollView,
                move2Left: false
            })
            layout.node.width = width;
        }
        else if (layout.type == cc.Layout.Type.VERTICAL) {
            height += (source.length - 2) * layout.spacingY + layout.paddingTop + layout.paddingBottom
            layout.node.height = height;

            let maxH = (height - scrollView.content.parent.height + layout.paddingTop + layout.paddingBottom) / 2;

            scrollView.setContentPosition(new cc.Vec2(contentPos.x, -maxH))
            // scrollView.getContentPosition
            this.mScrollVec.push({
                maxH,
                scrollView,
                move2Up: false
            })
        }
    }

    private scrollToBottom(scrollView: cc.ScrollView, timeInSecond: number) {
        scrollView.scrollToBottom(timeInSecond)

    }
    private scrollToTop(scrollView: cc.ScrollView, timeInSecond: number) {
        scrollView.scrollToTop(timeInSecond)
    }
    private mMoveSpeed: number = 2;
    public update(dt) {
        for (let i = 0; i < this.mScrollVec.length; i++) {
            let item = this.mScrollVec[i];
            let scrollView = item.scrollView as cc.ScrollView;
            if (scrollView.isScrolling())
                continue;

            let scrollOffset = scrollView.getMaxScrollOffset();
            let maxH = scrollOffset.y / 2 + 20;
            let maxW = scrollOffset.x / 2 + 20;
            let contentPos = scrollView.getContentPosition()
            if (item.move2Up == true) {
                if (contentPos.y > maxH) {
                    item.move2Up = false;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x, contentPos.y + this.mMoveSpeed))
            }
            else if (item.move2Up == false) {
                if (contentPos.y < -maxH) {
                    item.move2Up = true;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x, contentPos.y - this.mMoveSpeed))
            }
            if (item.move2Left == true) {
                if (contentPos.x > maxW) {
                    item.move2Left = false;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x + this.mMoveSpeed, contentPos.y))
            }
            else if (item.move2Left == false) {
                if (contentPos.x < -maxW) {
                    item.move2Left = true;
                }
                item.scrollView.setContentPosition(new cc.Vec2(contentPos.x - this.mMoveSpeed, contentPos.y))
            }
        }

    }
    private mZindex: number = 99999;
    private mPositionName: string = "";
    private onAdChange(data) {

        this.displayChange(data.showAd, data.callback)

        if (!isNaN(data.zIndex)) {
            this.node.zIndex = data.zIndex;
        }
        else {
            this.node.zIndex = this.mZindex;
        }
        this.mPositionName = data.position;
        // moosnow.platform.showBanner();
    }

    private showFull() {
        let tempAd = this.mShowAd;
        let tempCallback = this.mBackCall;
        this.mShowAd = moosnow.AD_POSITION.EXPORT
        this.displayChange(moosnow.AD_POSITION.EXPORT, () => {
            this.displayChange(tempAd, tempCallback)
        })
    }

    private mShowAd = moosnow.AD_POSITION.NONE;
    private mBackCall: Function
    public displayChange(data, callback = null) {
        let curApp = moosnow.getAppPlatform()
        if (moosnow.APP_PLATFORM.WX == curApp || curApp == moosnow.APP_PLATFORM.OPPO) {
            this.mShowAd = data;
            this.displayAd(true)
            this.mBackCall = callback;
        }
        else {
            this.onBack();
        }

    }


    private addAd(ad) {
        this.mShowAd |= ad;
    }
    private removeAd(ad) {
        if (this.hasAd(ad))
            this.mShowAd ^= ad;
    }
    private hasAd(ad) {
        return (this.mShowAd & ad) == ad;
    }

    private displayAd(visible: boolean) {

        this.floatContainer.active = visible && this.hasAd(moosnow.AD_POSITION.FLOAT);

        this.bannerContainer.active = visible && this.hasAd(moosnow.AD_POSITION.BANNER);

        this.centerContainer.active = visible && this.hasAd(moosnow.AD_POSITION.CENTER);

        this.leftContainer.active = visible && this.hasAd(moosnow.AD_POSITION.LEFTRIGHT);

        this.exportMask.active = visible && this.hasAd(moosnow.AD_POSITION.MASK);

        this.endContainer.active = visible && this.hasAd(moosnow.AD_POSITION.EXPORT);
        this.endContainer.active && this.initEndExport();

        this.exportClose.active = false;
        this.exportCloseTxt.active = false;

        this.unschedule(this.showExportClose)


        if (this.hasAd(moosnow.AD_POSITION.BACK)) {
            if (this.hasAd(moosnow.AD_POSITION.WAIT)) {
                this.mSecond = 3;
                this.showExportClose();
                this.schedule(this.showExportClose, 1);
            }
            else {
                this.exportClose.active = true;
                this.exportCloseTxt.active = false;
            }
        }
        else {
            this.exportClose.active = false;
            this.exportCloseTxt.active = false;
        }

        this.exportContainer.active = visible && this.hasAd(moosnow.AD_POSITION.EXPORT)
        if (visible && this.hasAd(moosnow.AD_POSITION.EXPORT)) {
            moosnow.http.getAllConfig(res => {
                if (res.exportAutoNavigate == 1) {
                    moosnow.platform.navigate2Mini(this.mAdData.indexLeft[moosnow.Common.randomNumBoth(0, this.mAdData.indexLeft.length - 1)])
                }
            })
        }

    }

    private mSecond: number = 3
    private showExportClose() {
        this.mSecond -= 1;
        this.exportCloseTxt.active = true;
        let closeLabel = this.exportCloseTxt.getComponent(cc.Label)
        if (this.mSecond <= 0) {
            this.exportClose.active = true;
            this.exportCloseTxt.active = false;
            this.unschedule(this.showExportClose)
            return;
        }
        closeLabel.string = `剩余${this.mSecond}秒可关闭`


    }
    private addEvent() {
        this.exportClose.on(cc.Node.EventType.TOUCH_START, this.onBack, this)
        this.floatFull.on(cc.Node.EventType.TOUCH_START, this.showFull, this)
        // this.endContinue.on(cc.Node.EventType.TOUCH_START, this.onBack, this)
        moosnow.event.addListener(moosnow.EVENT_TYPE.ON_AD_SHOW, this, this.onAdChange)
    }
    private removeEvent() {
        this.exportClose.off(cc.Node.EventType.TOUCH_START, this.onBack, this)
        this.floatFull.off(cc.Node.EventType.TOUCH_START, this.showFull, this)
        // this.endContinue.off(cc.Node.EventType.TOUCH_START, this.onBack, this)
        moosnow.event.removeListener(moosnow.EVENT_TYPE.ON_AD_SHOW, this)
    }



    private onWaitShow() {
        // this.endContinue.active = true;
        this.exportClose.active = true;
    }

    private onBack() {
        if (this.mBackCall)
            this.mBackCall();
    }
    private onConfirm() {
        this.onClose();
    }
    private onClose() {
    }


    private mAdData: moosnowResult

    /**
     * 
     * @param data 
     */
    public willShow(data) {

        this.mAdItemList = [];
        this.mScrollVec = []
        this.addEvent();
        this.displayChange(data.showAd, data.callback)


    }
    public onShow(data) {

        var param = {}

        moosnow.ad.getAd((res) => {
            this.mAdData = res;

            if (res.indexLeft.length == 0) {
                this.displayAd(false);
                return;
            }

            this.initBannerAd();

            this.initLeftRightAd();

            this.initFloatAd();

            this.initExportAd();

            this.initGameOverExport();

            this.initRespawnAd();

            this.initPlayerDiedAd();

            this.initPauseAd();
        })

        //控制显示广告  后续补充
    }



    public willHide() {
        this.removeEvent();
        this.mAdItemList.forEach(item => {
            moosnow.entity.hideEntity(item, null);
        })
        this.mAdItemList = [];
        this.mScrollVec = [];
    }



    private bannerX = 0;

}