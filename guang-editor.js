/*
 * Copyright 2011-2012, Guang.com
 * @contain: 富文本编辑器
 * @depends: jquery.js
 *
 * Author: luyao
 * Since: 2012-06-26
 * ModifyTime : 2012-07-25 01
 * http://www.guang.com/
 * email: water2212683@gmail.com
 *
 */

(function ($) {
	var COLOR = [{
			key : "333333",
			val : "灰色-80%"
		}, {
			key : "666666",
			val : "灰色-60%"
		}, {
			key : "999999",
			val : "灰色-40%"
		}, {
			key : "cccccc",
			val : "灰色-20%"
		}, {
			key : "bb0000",
			val : "深红"
		}, {
			key : "dd0000",
			val : "红色"
		}, {
			key : "ee4488",
			val : "粉红"
		}, {
			key : "ff66dd",
			val : "淡紫"
		}, {
			key : "333399",
			val : "深蓝"
		}, {
			key : "0066cc",
			val : "蓝色"
		}, {
			key : "0099cc",
			val : "天蓝"
		}, {
			key : "66cccc",
			val : "淡蓝"
		}, {
			key : "336600",
			val : "深绿"
		}, {
			key : "999900",
			val : "深黄"
		}, {
			key : "cccc33",
			val : "淡黄"
		}, {
			key : "77cc33",
			val : "淡绿"
		}, {
			key : "663300",
			val : "咖啡"
		}, {
			key : "cc6633",
			val : "褐色"
		}, {
			key : "ff9900",
			val : "橙黄"
		}, {
			key : "ffcc33",
			val : "黄色"
		}
	];
	var FONTSIZE = [1, 2, 3, 4];
	//RGB(0,0,0)转#000000
	var RGB2HEX = {
		"_515151" : "333333",
		"_102102102" : "666666",
		"_153153153" : "999999",
		"_204204204" : "cccccc",
		"_18700" : "bb0000",
		"_22100" : "dd0000",
		"_23868136" : "ee4488",
		"_255102221" : "ff66dd",
		"_5151153" : "333399",
		"_0102204" : "0066cc",
		"_0153204" : "0099cc",
		"_102204204" : "66cccc",
		"_511020" : "336600",
		"_1531530" : "999900",
		"_20420451" : "cccc33",
		"_11920451" : "77cc33",
		"_102510" : "663300",
		"_20410251" : "cc6633",
		"_2551530" : "ff9900",
		"_25520451" : "ffcc33"
	};
	//表情配对表
	var FACEJSON = [{
			key : "[织]",
			val : "zz2_thumb.gif"
		}, {
			key : "[神马]",
			val : "horse2_thumb.gif"
		}, {
			key : "[浮云]",
			val : "fuyun_thumb.gif"
		}, {
			key : "[给力]",
			val : "geili_thumb.gif"
		}, {
			key : "[围观]",
			val : "wg_thumb.gif"
		}, {
			key : "[威武]",
			val : "vw_thumb.gif"
		}, {
			key : "[熊猫]",
			val : "panda_thumb.gif"
		}, {
			key : "[兔子]",
			val : "rabbit_thumb.gif"
		}, {
			key : "[奥特曼]",
			val : "otm_thumb.gif"
		}, {
			key : "[囧]",
			val : "j_thumb.gif"
		}, {
			key : "[互粉]",
			val : "hufen_thumb.gif"
		}, {
			key : "[礼物]",
			val : "liwu_thumb.gif"
		}, {
			key : "[呵呵]",
			val : "smilea_thumb.gif"
		}, {
			key : "[嘻嘻]",
			val : "tootha_thumb.gif"
		}, {
			key : "[哈哈]",
			val : "laugh.gif"
		}, {
			key : "[可爱]",
			val : "tza_thumb.gif"
		}, {
			key : "[可怜]",
			val : "kl_thumb.gif"
		}, {
			key : "[挖鼻屎]",
			val : "kbsa_thumb.gif"
		}, {
			key : "[吃惊]",
			val : "cj_thumb.gif"
		}, {
			key : "[害羞]",
			val : "shamea_thumb.gif"
		}, {
			key : "[挤眼]",
			val : "zy_thumb.gif"
		}, {
			key : "[闭嘴]",
			val : "bz_thumb.gif"
		}, {
			key : "[鄙视]",
			val : "bs2_thumb.gif"
		}, {
			key : "[爱你]",
			val : "lovea_thumb.gif"
		}, {
			key : "[泪]",
			val : "sada_thumb.gif"
		}, {
			key : "[偷笑]",
			val : "heia_thumb.gif"
		}, {
			key : "[亲亲]",
			val : "qq_thumb.gif"
		}, {
			key : "[生病]",
			val : "sb_thumb.gif"
		}, {
			key : "[太开心]",
			val : "mb_thumb.gif"
		}, {
			key : "[懒得理你]",
			val : "ldln_thumb.gif"
		}, {
			key : "[右哼哼]",
			val : "yhh_thumb.gif"
		}, {
			key : "[左哼哼]",
			val : "zhh_thumb.gif"
		}, {
			key : "[嘘]",
			val : "x_thumb.gif"
		}, {
			key : "[衰]",
			val : "cry.gif"
		}, {
			key : "[委屈]",
			val : "wq_thumb.gif"
		}, {
			key : "[吐]",
			val : "t_thumb.gif"
		}, {
			key : "[打哈欠]",
			val : "k_thumb.gif"
		}, {
			key : "[抱抱]",
			val : "bba_thumb.gif"
		}, {
			key : "[怒]",
			val : "angrya_thumb.gif"
		}, {
			key : "[疑问]",
			val : "yw_thumb.gif"
		}, {
			key : "[馋嘴]",
			val : "cza_thumb.gif"
		}, {
			key : "[拜拜]",
			val : "88_thumb.gif"
		}, {
			key : "[思考]",
			val : "sk_thumb.gif"
		}, {
			key : "[汗]",
			val : "sweata_thumb.gif"
		}, {
			key : "[困]",
			val : "sleepya_thumb.gif"
		}, {
			key : "[睡觉]",
			val : "sleepa_thumb.gif"
		}, {
			key : "[钱]",
			val : "money_thumb.gif"
		}, {
			key : "[失望]",
			val : "sw_thumb.gif"
		}, {
			key : "[酷]",
			val : "cool_thumb.gif"
		}, {
			key : "[花心]",
			val : "hsa_thumb.gif"
		}, {
			key : "[哼]",
			val : "hatea_thumb.gif"
		}, {
			key : "[鼓掌]",
			val : "gza_thumb.gif"
		}, {
			key : "[晕]",
			val : "dizzya_thumb.gif"
		}, {
			key : "[悲伤]",
			val : "bs_thumb.gif"
		}, {
			key : "[抓狂]",
			val : "crazya_thumb.gif"
		}, {
			key : "[黑线]",
			val : "h_thumb.gif"
		}, {
			key : "[阴险]",
			val : "yx_thumb.gif"
		}, {
			key : "[怒骂]",
			val : "nm_thumb.gif"
		}, {
			key : "[心]",
			val : "hearta_thumb.gif"
		}, {
			key : "[伤心]",
			val : "unheart.gif"
		}, {
			key : "[猪头]",
			val : "pig.gif"
		}, {
			key : "[ok]",
			val : "ok_thumb.gif"
		}, {
			key : "[耶]",
			val : "ye_thumb.gif"
		}, {
			key : "[good]",
			val : "good_thumb.gif"
		}, {
			key : "[不要]",
			val : "no_thumb.gif"
		}, {
			key : "[赞]",
			val : "z2_thumb.gif"
		}, {
			key : "[来]",
			val : "come_thumb.gif"
		}, {
			key : "[弱]",
			val : "sad_thumb.gif"
		}, {
			key : "[蜡烛]",
			val : "lazu_thumb.gif"
		}, {
			key : "[蛋糕]",
			val : "cake.gif"
		}, {
			key : "[钟]",
			val : "clock_thumb.gif"
		}, {
			key : "[话筒]",
			val : "m_thumb.gif"
		}
	];
	//魔法开始
	var Editor = function (config) {
		return new Editor.fn.init(config);
	};
	Editor.prototype = Editor.fn = {
		config : {
			//将编辑器组装好后插入到textarea后面，textarea的ID
			textareaID : "J_ForumPostCon",
			formId : "J_ForumPostEditForm",
			toolbarId : "J_GuangEditorToolbar",
			//mediaDate 媒体集模型（图片，视频，宝贝）
			// {
			// baobei:[{id:"100001",name:"宝贝名字",pic:{"http://img"}}],
			// img:...,
			// video:...
			// }
			mediaDate : {},
			//mediaDateTypes 媒体类模型（图片，视频，宝贝）
			//["baobei","img","video"]
			mediaDateTypes : [],
			//videoLoadMaxNum 视频每栏最大加载数
			videoLoadMaxNum : 5,
			//按钮参数配置
			btnFontSize : {
				cssName : "font-size",
				visible : true,
				exec : function (self) {
					if (!self.FontSizeWrapDom || self.FontSizeWrapDom.length === 0) {
						var html = '\
														<div class="fontSizeWrap">\
															<a btntype="btnFontSizeAction" size="1" style="font-size:12px;" href="javascript:;" title="小号" unselectable="on">小号</a>\
															<a btntype="btnFontSizeAction" size="2" style="font-size:14px;" href="javascript:;" title="标准" unselectable="on">标准</a>\
															<a btntype="btnFontSizeAction" size="3" style="font-size:16px;" href="javascript:;" title="大号" unselectable="on">大号</a>\
															<a btntype="btnFontSizeAction" size="4" style="font-size:18px;" href="javascript:;" title="特大" unselectable="on">特大</a>\
														</div>';
						var config = self.config;
						$('#' + config.toolbarId).append(html);
						self.FontSizeWrapDom = $('#' + config.toolbarId + ' .fontSizeWrap');
						if (self.curVisiableDom) {
							self.curVisiableDom.hide();
						}
						self.curVisiableDom = self.FontSizeWrapDom;
					} else {
						if (self.curVisiableDom === self.FontSizeWrapDom) {
							self.FontSizeWrapDom.hide();
							self.curVisiableDom = null;
						} else {
							if (self.curVisiableDom) {
								self.curVisiableDom.hide();
							}
							self.FontSizeWrapDom.show();
							self.curVisiableDom = self.FontSizeWrapDom;
						}
					}
				},
				selectionStyleFun : function (self, curElm, $parents) {
					var tagName = curElm.nodeName.toLowerCase();
					var val = null;
					var reg_css = /size/i;
					val = $(curElm).attr("size") || null;
					if (!val && $parents) {
						var length = $parents.length;
						for (var i = 0; i < length; i++) {
							val = $parents.eq(i).attr("size") || null;
							if (val) {
								break;
							}
						}
					}
					if (!self.curFontSize) {
						self.curFontSize = null;
					}
					if (val != self.curFontSize) {
						if (val == null) {
							$('#' + self.config.toolbarId + ' .font-size a').text("标准");
							self.curFontSize = null;
						} else {
							$('#' + self.config.toolbarId + ' .font-size a').text(self.config.btnFontSize.data["f" + val]);
							self.curFontSize = val;
						}
					}
				},
				data : {
					"f1" : "小号",
					"f2" : "标准",
					"f3" : "大号",
					"f4" : "特大"
				},
				html : "\
<div class='font-btns font-size'>\
	<a href='javascript:;' btntype='btnFontSize' title='字号' unselectable='on'>标准</a>\
</div>"
			},
			btnFontSizeAction : {
				exec : function (self, $srcElement) {
					var size = $srcElement.attr("size");
					self.execCommand("fontsize", size);
					$('#' + self.config.toolbarId + ' .font-size a').text($srcElement.attr("title"));
					self.curFontSize = size;
					self.curVisiableDom.hide();
					self.curVisiableDom = null;
				}
			},
			btnFontBold : {
				cssName : "font-bold",
				visible : true,
				exec : function (self, $srcElement) {
					if ($srcElement.parent().hasClass("font-bold-active")) {
						$('#' + self.config.toolbarId + ' .font-bold').removeClass("font-bold-active");
					} else {
						$('#' + self.config.toolbarId + ' .font-bold').addClass("font-bold-active");
					}
					self.execCommand("bold", "");
				},
				selectionStyleFun : function (self, curElm, $parents) {
					var tagName = curElm.nodeName.toLowerCase();
					var reg_tagName = {
						"b" : true,
						"strong" : true
					};
					var reg_css = /bold/i;
					var outerHTML = curElm.outerHTML.match(/\<[^\>]+\>/)[0];
					var val = false;
					
					if (reg_tagName[tagName] || reg_css.test(outerHTML)) {
						val = true;
					}
					if (!val && $parents) {
						var length = $parents.length
							for (var i = 0; i < length; i++) {
								var curDom = $parents[i];
								var tagName = curDom.nodeName.toLowerCase();
								var outerHTML = curDom.outerHTML.match(/\<[^\>]+\>/)[0];
								if (reg_tagName[tagName] || reg_css.test(outerHTML)) {
									val = true;
									break;
								}
							}
					}
					
					var btnDom = $('#' + self.config.toolbarId + ' .font-bold');
					var hasBold = btnDom.hasClass("font-bold-active");
					if (val && !hasBold) {
						$('#' + self.config.toolbarId + ' .font-bold').addClass("font-bold-active");
					}
					if (!val && hasBold) {
						$('#' + self.config.toolbarId + ' .font-bold').removeClass("font-bold-active");
					}
				},
				html : "\
<div class='font-btns font-bold'>\
	<a href='javascript:;' btntype='btnFontBold' title='粗体' unselectable='on'>粗体</a>\
</div>"
			},
			btnFontColo : {
				cssName : "font-color",
				visible : true,
				exec : function (self) {
					if (!self.FontColoWrapDom || self.FontColoWrapDom.length == 0) {
						var html = '<div class="fontColoWrap">';
						var length = COLOR.length;
						for (var i = 0; i < length; i++) {
							html += '<a btntype="btnFontColoAction" coloval="#' + COLOR[i].key + '" style="background-color:#' + COLOR[i].key + ';" href="javascript:;" title="' + COLOR[i].val + '" unselectable="on">#' + COLOR[i].key + '</a>'
						}
						html += '</div>';
						$('#' + self.config.toolbarId).append(html);
						self.FontColoWrapDom = $('#' + self.config.toolbarId + ' .fontColoWrap');
						if (self.curVisiableDom) {
							self.curVisiableDom.hide();
						}
						self.curVisiableDom = self.FontColoWrapDom;
					} else {
						if (self.curVisiableDom == self.FontColoWrapDom) {
							self.FontColoWrapDom.hide();
							self.curVisiableDom = null;
						} else {
							if (self.curVisiableDom)
								self.curVisiableDom.hide();
							self.FontColoWrapDom.show();
							self.curVisiableDom = self.FontColoWrapDom;
						}
					}
				},
				selectionStyleFun : function (self, curElm, $parents) {
					var tagName = curElm.nodeName.toLowerCase();
					var val = null;
					var reg_css = /color\:/i;
					var reg_rgb = /rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i;
					var outerHTML = curElm.outerHTML.match(/\<[^\>]+\>/)[0];
					var attrColor = $(curElm).attr("color");
					if (attrColor) {
						val = attrColor;
					} else if (reg_css.test(outerHTML)) {
						var rgbArr = outerHTML.match(reg_rgb);
						if (rgbArr) {
							var hex = RGB2HEX["_" + rgbArr[1] + rgbArr[2] + rgbArr[3]];
							val = "#" + hex;
						}
						//to do reg hex
					}
					if (!val && $parents) {
						var length = $parents.length
							for (var i = 0; i < length; i++) {
								var curDom = $parents[i];
								var tagName = curDom.nodeName.toLowerCase();
								var outerHTML = curDom.outerHTML.match(/\<[^\>]+\>/)[0];
								var attrColor = $(curDom).attr("color");
								if (attrColor) {
									val = attrColor;
								} else if (reg_css.test(outerHTML)) {
									var rgbArr = outerHTML.match(reg_rgb);
									if (rgbArr) {
										var hex = RGB2HEX["_" + rgbArr[1] + rgbArr[2] + rgbArr[3]];
										val = "#" + hex;
									}
									//to do reg style hex
								}
								if (val) {
									break;
								}
							}
					}
					if (!self.curFontColor) {
						self.curFontColor = null;
					}
					if (val != self.curFontColor) {
						if (val == null) {
							$('#' + self.config.toolbarId + ' .font-colo i').css("background-color", "#333333");
							self.curFontColor = null;
						} else {
							$('#' + self.config.toolbarId + ' .font-colo i').css("background-color", val);
							self.curFontColor = val;
						}
					}
				},
				html : "\
<div class='font-btns font-colo'>\
	<a href='javascript:;' btntype='btnFontColo' title='前景色' unselectable='on'><span btntype='btnFontColo' unselectable='on'><i btntype='btnFontColo' unselectable='on'></i></span></a>\
</div>"
			},
			btnFontColoAction : {
				exec : function (self, $srcElement) {
					var color = $srcElement.attr("coloval");
					self.execCommand("forecolor", color);
					$('#' + self.config.toolbarId + ' .font-colo i').css("background-color", $srcElement.attr("coloval"));
					self.curFontColor = color;
					self.curVisiableDom.hide();
					self.curVisiableDom = null;
				}
			},
			btnFace : {
				visible : true,
				exec : function (self) {
					if (!self.FaceWrapDom || self.FaceWrapDom.length == 0) {
						var html = '\
														<div class="faceWrap"><div class="faceWrapBorder clearfix">'
							for (var i = 0; i < FACEJSON.length; i++) {
								html += '<a btntype="btnFaceAction" faceval="' + FACEJSON[i].val + '" style="background:#fff url(http://static.guang.com/img/face/common/' + FACEJSON[i].val + ') 4px 4px no-repeat;" href="javascript:;" title="' + FACEJSON[i].key + '" unselectable="on">' + FACEJSON[i].key + '</a>'
							}
							html += '</div></div>';
						$('#' + self.config.toolbarId).append(html);
						self.FaceWrapDom = $('#' + self.config.toolbarId + ' .faceWrap');
						if (self.curVisiableDom) {
							self.curVisiableDom.hide();
						}
						self.curVisiableDom = self.FaceWrapDom;
					} else {
						if (self.curVisiableDom == self.FaceWrapDom) {
							self.FaceWrapDom.hide();
							self.curVisiableDom = null;
						} else {
							if (self.curVisiableDom)
								self.curVisiableDom.hide();
							self.FaceWrapDom.show();
							self.curVisiableDom = self.FaceWrapDom;
						}
					}
				},
				html : "\
<div class='media-btns face'>\
	<a href='javascript:;' btntype='btnFace' title='表情' unselectable='on'>表情</a>\
</div>"
			},
			btnFaceAction : {
				exec : function (self, $srcElement) {
					if (self.isIE678) {
						self.insertHTML("<img unselectable='on' src='http://static.guang.com/img/face/common/" + $srcElement.attr("faceval") + "' title='" + $srcElement.attr("title") + "' alt='" + $srcElement.attr("title") + "'/>");
					} else {
						var imgDom = self.iframeDocument.createElement("img");
						imgDom.src = 'http://static.guang.com/img/face/common/' + $srcElement.attr("faceval");
						imgDom.setAttribute("unselectable", "on")
						imgDom.setAttribute("title", $srcElement.attr("title"))
						imgDom.setAttribute("alt", $srcElement.attr("title"))
						self.insertHTML(imgDom);
					}
					self.curVisiableDom.hide();
					self.curVisiableDom = null;
				}
			},
			btnBaobei : {
				visible : true,
				exec : function (self) {
					if (!self.BaobeiWrapDom || self.BaobeiWrapDom.length == 0) {
						var html = '\
<div class="baobeiWrap">\
	<div class="content">\
		<p class="title">将宝贝网址粘贴到下面框中：</p>\
		<div class="sg-form">\
			<div class="clearfix">\
			<input class="base-input sg-input" id="J_BaobeiUrl" name="url" value="" placeholder="http://" autocomplete="off">\
			<input type="button" class="bbl-btn" id="J_InsertBaobei" value="确定">\
			</div>\
			<div class="text-tip"></div>\
		</div>\
		<div class="sg-source">\
			<p class="pt5 pb5">已支持网站（<a href="http://guang.com/contact" target="_blank">商家申请加入</a>）：</p>\
			<div class="source-list clearfix">\
				<a class="icon-source icon-taobao" href="http://www.taobao.com/" target="_blank">淘宝网</a>\
				<a class="icon-source icon-tmall" href="http://www.tmall.com/" target="_blank">天猫商城</a>\
				<a class="icon-source icon-paipai" href="http://buy.qq.com/" target="_blank">QQ网购</a>\
				<a class="icon-source icon-mbaobao" href="http://www.mbaobao.com/" target="_blank">麦包包</a>\
				<a class="icon-source icon-vancl" href="http://www.vancl.com/" target="_blank">凡客诚品</a>\
			</div>\
		</div>\
		<div class="tipbox-up">\
			<em>◆</em>\
			<span>◆</span>\
		</div>\
	</div>\
</div>';
						var getBaobei = function (id) {
							$.ajax({
								url : GUANGER.path + "/editor/getbaobei",
								type : "post",
								dataType : "json",
								data : {
									id : id
								},
								baobeiId : id,
								success : function (json) {
									switch (json.code) {
									case 100: {
											json.id = this.baobeiId;
											json.pic = json.baobeiPic;
											json.name = json.baobeiName;
											self.insertMedia(json, "baobei");
											self.btnBaobeiUrl.val("");
											if (self.curVisiableDom) {
												self.curVisiableDom.hide();
												self.curVisiableDom = null;
											}
										}
										break;
									case 101: {
											$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
											$.guang.tip.show(self.btnBaobei, json.msg);
										}
										break;
									}
								}
							});
						}
						var shareBaobei = function (url) {
							var localUrl = "guang.com";
							if (url.indexOf(localUrl) != -1) {
								var reg = /baobei\/(\d{3,12})/i;
								var regResult = url.match(reg);
								if (regResult && regResult[1]) {
									getBaobei(regResult[1]);
								} else {
									$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
									$.guang.tip.show(self.BaobeiInerstSubmit, "站内宝贝链接错误");
								}
							} else {
								if (url == "") {
									$(".text-tip").html('<span class="errc">宝贝网址不能为空~</span>').show();
								} else if (!$.guang.util.validSite(url)) {
									$(".text-tip").html('<span class="errc">暂时还不支持这个网站呢~</span>').show();
								} else {
									$(".text-tip").html('<span class="gc6">宝贝信息抓取中…</span>').show();
									self.BaobeiInerstSubmit.disableBtn("bbl-btn");
									$.post(
										GUANGER.path + '/ugc/api/findProduct', {
										url : url
									},
										function (data) {
										if (data.code == 100) {
											$(".text-tip").html('');
											$.guang.ugc.goodspub(data.product, data.isUploadRole, getBaobei);
										} else if (data.code == 105) {
											$(".text-tip").html('');
											getBaobei(data.product.productVoId);
										} else if (data.code == 101 || data.code == 106) {
											$(".text-tip").html('<span class="errc">宝贝信息抓取失败，请重试…</span>').show();
										} else if (data.code == 107) {
											$(".text-tip").html('<span class="errc">暂时还不支持这个宝贝…</span>').show();
										} else if (data.code == 108) {
											$(".text-tip").html('');
											getBaobei(data.product.productVoId);
										} else if (data.code == 110) {
											$(".text-tip").html('<span class="errc">亲，该商品所在商家已列入黑名单，申诉请联系GCTU@guang.com</span>').show();
										} else if (data.code == 444) {
											alert("你已被禁止登录！");
											window.location.href = "http://guang.com/logout";
										} else if (data.code == 442) {
											alert("亲，请不要频繁推荐同一店铺商品");
										} else if (data.code == 443) {
											alert("由于过度推荐同店铺商品，账户已冻结，如有疑问请联系 GCTU@guang.com");
										} else if (data.code == 445) {
											alert("城管大队怀疑你恶意发广告，将禁止你发布商品的权利，申诉请联系GCTU@guang.com");
										}
										self.BaobeiInerstSubmit.enableBtn("bbl-btn");
									});
								}
							}
						}
						$('#' + self.config.toolbarId).append(html);
						self.btnBaobeiUrl = $("#J_BaobeiUrl");
						self.btnBaobei = $('#' + self.config.toolbarId + ' .baobei');
						self.BaobeiInerstSubmit = $('#J_InsertBaobei');
						self.BaobeiInerstSubmit.bind("click", function () {
							shareBaobei($.trim(self.btnBaobeiUrl.val()));
						})
						if (self.curVisiableDom) {
							self.curVisiableDom.hide();
						}
						self.BaobeiWrapDom = $('#' + self.config.toolbarId + ' .baobeiWrap');
						self.curVisiableDom = self.BaobeiWrapDom;
					} else {
						if (self.curVisiableDom == self.BaobeiWrapDom) {
							self.BaobeiWrapDom.hide();
							self.curVisiableDom = null;
						} else {
							if (self.curVisiableDom)
								self.curVisiableDom.hide();
							self.BaobeiWrapDom.show();
							self.curVisiableDom = self.BaobeiWrapDom;
						}
					}
				},
				html : "\
<div class='media-btns baobei'>\
	<a href='javascript:;' btntype='btnBaobei' title='商品' unselectable='on'>商品</a>\
</div>"
			},
			btnImg : {
				visible : true,
				exec : function (self) {
					if (!self.ImgWrapDom || self.ImgWrapDom.length == 0) {
						var html = '\
<div class="imgWrap">\
	<form method="post" enctype="multipart/form-data" class="uploadImg clearfix" action="' + GUANGER.path + '/editor/uploadImg" target="photo-frame" id="J_LocalImgForm">\
		<input type="button" value="上传本地图片" class="bbl-btn upload-cover">\
		<input type="file" class="upload-btn" id="J_LocalImgFormSubmit" name="filedata">\
		<span class="fl gc pt5 pl5">支持GIF、JPG、PNG,大小不超过2M</span>\
	</form>\
	<div class="netImg clearfix">\
		<p>插入网络图片：</p>\
		<input class="base-input" id="J_InsertNetImgInput" value="" placeholder="http://" autocomplete="off"/>\
		<input type="button" id="J_InsertNetImgSubmit" class="bbl-btn" value="确定">\
	</div>\
	<div class="tipbox-up">\
		<em>◆</em>\
		<span>◆</span>\
	</div>\
	<iframe style="width:0px;height:0px;padding:0px;" src="" frameborder="0" name="photo-frame"></iframe>\
</div>';
						$('#' + self.config.toolbarId).append(html);
						self.ImgUploadSubmitDom = $('#J_LocalImgFormSubmit');
						self.ImgUploadFormDom = $('#J_LocalImgForm');
						self.ImgUploadSubmitDom.change(function () {
							var file = self.ImgUploadSubmitDom.val();
							var reg_file = /\.(?:jpg|png|gif)$/i;
							if (reg_file.test(file)) {
								self.ImgUploadFormDom.submit();
							} else {
								self.ImgUploadSubmitDom.val("");
								$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
								$.guang.tip.show(self.ImgUploadSubmitDom, "只支持GIF、JPG、PNG,大小不超过2M");
							}
						});
						self.uploadImgCallback = function (success, data) {
							if (success) {
								var media = {};
								media.id = data;
								media.pic = data;
								media.name = "上传图片";
								self.insertMedia(media, "img");
								self.ImgUploadSubmitDom.val("");
							} else {
								self.ImgUploadSubmitDom.val("");
								$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
								$.guang.tip.show(self.ImgUploadSubmitDom, data);
							}
							self.curVisiableDom.hide();
							self.curVisiableDom = null
						}
						self.insertNetImgInputDom = $('#J_InsertNetImgInput');
						self.insertNetImgSubmitDom = $('#J_InsertNetImgSubmit');
						self.insertNetImgSubmitDom.click(function () {
							var url = $.trim(self.insertNetImgInputDom.val());
							var reg_url = /^https?\:\/\//i;
							if (url.length > 200) {
								$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
								$.guang.tip.show(self.insertNetImgSubmitDom, "请输入一个正确的图片网址");
								return "image src is too long!";
							}
							if (reg_url.test(url)) {
								var media = {};
								media.id = url;
								media.pic = url;
								media.name = "网络图片";
								self.insertMedia(media, "img");
								self.insertNetImgInputDom.val("");
								self.curVisiableDom.hide();
								self.curVisiableDom = null
							} else {
								$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
								$.guang.tip.show(self.insertNetImgSubmitDom, "请输入一个正确的图片网址(带http://)");
							}
						})
						if (self.curVisiableDom) {
							self.curVisiableDom.hide();
						}
						self.ImgWrapDom = $('#' + self.config.toolbarId + ' .imgWrap');
						self.curVisiableDom = self.ImgWrapDom;
					} else {
						if (self.curVisiableDom == self.ImgWrapDom) {
							self.ImgWrapDom.hide();
							self.curVisiableDom = null;
						} else {
							if (self.curVisiableDom)
								self.curVisiableDom.hide();
							self.ImgWrapDom.show();
							self.curVisiableDom = self.ImgWrapDom;
						}
					}
				},
				html : "\
<div class='media-btns img'>\
	<a href='javascript:;' btntype='btnImg' title='图片' unselectable='on'>图片</a>\
</div>"
			},
			btnVideo : {
				visible : true,
				exec : function (self) {
					if (!self.VideoWrapDom || self.VideoWrapDom.length == 0) {
						var html = '\
<div class="videoWrap sg-dialog">\
	<div class="content">\
		<p class="title">输入视频播放页网址：</p>\
		<form class="sg-form" name="shareGoods" action="">\
			<div class="clearfix">\
			<input class="base-input sg-input" id="J_InsertVideoInput" name="url" value="" placeholder="http://" autocomplete="off">\
			<input type="button" id="J_InsertVideo" class="bbl-btn" value="确定">\
			</div>\
		</form>\
		<div class="sg-source">\
			<p>已支持网站：</p>\
			<div class="source-list clearfix">\
			<a class="icon-youku" href="http://www.youku.com/" target="_blank">优酷网</a>\
			<a class="icon-tudou" href="http://www.tudou.com/" target="_blank">土豆网</a>\
			<a class="icon-sinavideo" href="http://video.sina.com.cn/" target="_blank">新浪视频</a>\
			</div>\
		</div>\
		<div class="tipbox-up">\
			<em>◆</em>\
			<span>◆</span>\
		</div>\
	</div>\
</div>';
						$('#' + self.config.toolbarId).append(html);
						self.insertVideoSubmitDom = $('#J_InsertVideo');
						self.VideoInputDom = $('#J_InsertVideoInput');
						self.insertVideoSubmitDom.bind("click", function () {
							var videoUrl = $.trim(self.VideoInputDom.val());
							var reg_url = /^https?\:\/\//i;
							var reg_youku = /^https?\:\/\/v\.youku\.com\//i;
							var reg_sinavideo = /^https?\:\/\/[^\/]+sina\.com\.cn\//i;
							var reg_tudou = /^https?\:\/\/[^\/]+tudou\.com\//i;
							if (reg_url.test(videoUrl)) {
								if (reg_youku.test(videoUrl) || reg_sinavideo.test(videoUrl) || reg_tudou.test(videoUrl)) {
									self.VideoInputDom.val("");
									$.ajax({
										url : GUANGER.path + "/editor/getVideo",
										type : "post",
										dataType : "json",
										data : {
											url : videoUrl
										},
										success : function (json) {
											switch (json.code) {
											case 100: {
													self.curVisiableDom.hide();
													self.curVisiableDom = null;
													json.id = json.swf;
													json.name = json.title;
													self.insertMedia(json, "video");
												}
												break;
											case 101: {
													$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
													$.guang.tip.show(self.btnBaobei, json.msg);
													self.curVisiableDom.hide();
													self.curVisiableDom = null;
												}
												break;
											}
										}
									});
								} else {
									$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
									$.guang.tip.show(self.insertVideoSubmitDom, "不支持该站视频");
								}
							} else {
								$.guang.tip.conf.tipClass = "tipmodal tipmodal-error";
								$.guang.tip.show(self.insertVideoSubmitDom, "请输入一个正确的视频网页地址(带http://)");
							}
						});
						self.VideoWrapDom = $('#' + self.config.toolbarId + ' .videoWrap');
						if (self.curVisiableDom) {
							self.curVisiableDom.hide();
						}
						self.curVisiableDom = self.VideoWrapDom;
					} else {
						if (self.curVisiableDom == self.VideoWrapDom) {
							self.VideoWrapDom.hide();
							self.curVisiableDom = null;
						} else {
							if (self.curVisiableDom)
								self.curVisiableDom.hide();
							self.VideoWrapDom.show();
							self.curVisiableDom = self.VideoWrapDom;
						}
					}
				},
				html : "\
<div class='media-btns video'>\
	<a href='javascript:;' btntype='btnVideo' title='视频' unselectable='on'>视频</a>\
</div>"
			},
			btnSplit : {
				visible : true,
				html : "<span class='split'></span>"
			},
			//按钮按顺序加载
			btnsLoadOrder : ['btnFontSize', 'btnFontBold', 'btnFontColo', 'btnSplit', 'btnFace', 'btnBaobei', 'btnImg', 'btnVideo']
		},
		isIE678 : ! + "\v1",
		iframe : null,
		iframeDocument : null,
		setConfig : function (conf) {
			return $.extend(true, this.config, conf || {});
		},
		init : function (conf) {
			var self = this;
			//更新配置
			this.setConfig(conf)
			//加载Editor
			this.insertEditor();
			this.setEditor();
			if (this.config.mediaDateTypes.length !== 0) {
				this.reflowMedia();
			}
			this.id = 0;
		},
		insertEditor : function () {
			var self = this;
			var html = "<div class='guang-editor-wrap'><div class='guang-editor'><div class='edit-btns' id='" + self.config.toolbarId + "'>";
			$.each(self.config.btnsLoadOrder, function () {
				var btn = self.config[this];
				if (btn.visible) {
					html += btn.html;
					if (btn.cssName) {
						if (!self.selectionStyleFuns) {
							self.selectionStyleFuns = {};
						}
						self.selectionStyleFuns[btn.cssName] = btn.selectionStyleFun;
					}
				}
			})
			html += "</div>"
			html += "<div class='iframeWrap'><iframe frameborder='0' id='J_GuangEditorIframe'></iframe></div>"
			html += "</div></div>"
			$("#" + self.config.textareaID).after(html).hide();
			this.iframe = $("#J_GuangEditorIframe")[0];
			this.iframeDocument = this.iframe.contentDocument || this.iframe.contentWindow.document;
		},
		setToolbar : function () {
			var self = this;
			$("body").bind("click", function () {
				if (self.curVisiableDom) {
					self.curVisiableDom.hide();
					self.curVisiableDom = null;
				}
			})
			$('#' + self.config.toolbarId).bind("click", function () {
				var e = arguments[0] || window.event,
				target = e.srcElement ? $(e.srcElement) : $(e.target),
				btnType = target.attr("btntype");
				if (e.stopPropagation) {
					e.stopPropagation();
				} else {
					e.cancelBubble = true;
				}
				if (btnType) {
					self.config[btnType].exec(self, target);
				} else {
					//self.execCommand("","");
				}
			});
		},
		setEditor : function () {
			var self = this;
			//给按钮添加功能
			self.setToolbar();
			//填充iframe内容，主要功能是使用户在多行输入的时候，iframe自动增高
			self.iframeDocument.designMode = "on";
			self.iframeDocument.open();
			if (self.isIE678) {
				self.iframeDocument.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:14px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}body{font-family:Arial,Helvetica,Sans-Serif;font-size:14px;text-align:left;} p{margin:10px 0;} em{font-style:italic;} img{border:0;max-width:100%;cursor:default;}</style></head></html>');
			} else {
				self.iframeDocument.write('<html><head><style type="text/css">html,body{height:100%;width:100%;margin:0;padding:0;border:0;overflow:auto;background:#fff;cursor:text;font-size:14px;word-wrap:break-word;}p{padding:0;margin:0;}*{line-height:160%;}html{height:1px;overflow:visible;} body{overflow:hidden;font-family:Arial,Helvetica,Sans-Serif;font-size:14px;text-align:left;} p{margin:10px 0;} em{font-style:italic;} img{border:0;max-width:100%;}</style></head></html>');
			}
			self.iframeDocument.close();
			var textareaVal = $("#" + self.config.textareaID).val();
			if (textareaVal != "") {
				self.iframeDocument.body.innerHTML = self.contentDecode(textareaVal, true);
				self.iframe.contentWindow.focus();
				$(self.iframe).height($(self.iframeDocument).height());
			}
			//当用户使用鼠标在文本上操作的时候，获得该文本区域的样式，使工具栏样式联动
			$(self.iframeDocument).bind("mouseup click", function () {
				var e = arguments[0] || window.event,
				curElm,
				nodeName;
				$.guang.dialog.isLogin();
				//时间涉及选中和点击，选中有可能只在某个节点内，那么会同时触发点击
				//判断是否选中文本
				if (e.type == "mouseup") {
					var range = self.getRange();
					if (self.isIE678) {
						if (range.text.length != 0) {
							curElm = self.selectionTextContainer = range.parentElement();
						} else {
							self.selectionTextContainer = null;
						}
					} else {
						if (range.endContainer != range.startContainer) {
							if (range.commonAncestorContainer.nodeType == 3) {
								curElm = self.selectionTextContainer = range.commonAncestorContainer.parentNode;
							} else {
								curElm = self.selectionTextContainer = range.commonAncestorContainer;
							}
						} else {
							self.selectionTextContainer = null;
						}
					}
					if (self.selectionTextContainer) {
						for (var i in self.selectionStyleFuns) {
							var parents = $(self.selectionTextContainer).parents("font,b,span,p,div");
							if (parents.length == 0) {
								parents = null;
							}
							self.selectionStyleFuns[i](self, self.selectionTextContainer, parents);
						}
					}
					//未选中文本
				} else if (self.selectionTextContainer == null) {
					curElm = e.srcElement ? e.srcElement : e.target;
					if (self.curVisiableDom) {
						self.curVisiableDom.hide();
						self.curVisiableDom = null;
					}
					for (var i in self.selectionStyleFuns) {
						var parents = $(curElm).parents();
						if (parents.length == 0) {
							parents = null;
						}
						self.selectionStyleFuns[i](self, curElm, parents);
					}
				}
			})
			$(self.iframeDocument).bind("keyup", function (event) {
				try {
					var range = self.getRange();
					var funs = self.selectionStyleFuns;
					var length = self.selectionStyleFuns.length;
					for (var i = 0; i < length; i++) {
						funs[i](self, self.isIE678 ? range.parentElement() : range.endContainer.parentNode);
					}
				} catch (e) {
					alert(e)
				}
				$(self.iframe).height($(self.iframeDocument).height());
				//当工具栏被滚动到看不见的时候...
				if(!self.toolbarBindScrollEvent){
					$(window).bind("scroll", function () {
						self.toolbarBindScrollEvent = true;
						var docScrollTop = $(document).scrollTop();
						if (!self.toolbarOffsetTop) {
							self.toolbarOffsetTop = $('#' + self.config.toolbarId).offset().top;
						}
						if (self.toolbarOffsetTop <= docScrollTop) {
							if ($.guang.util.isIE6()) {
								//to do
							} else {
								if (!self.toolbarPositionFixed) {
									self.toolbarPositionFixed = true;
									$('#' + self.config.toolbarId).css({
										position : "fixed",
										top : "38px",
										width : $('#' + self.config.toolbarId).width() + "px"
									})
								}
							}
						} else {
							if (self.toolbarPositionFixed) {
								self.toolbarPositionFixed = false;
								$('#' + self.config.toolbarId).css({
									position : "relative",
									top : "0"
								})
							}
						}
					});
				}
			});
			//IE下光标会丢失
			if ($.browser.msie) {
				var addEvent = function (el, type, fn) {
					el['e' + type + fn] = fn;
					el.attachEvent('on' + type, function () {
						el['e' + type + fn]();
					});
				}
				var bookmark;
				//记录IE的编辑光标
				addEvent(self.iframe, "beforedeactivate", function () { //在文档失去焦点之前
					var range = self.iframeDocument.selection.createRange();
					bookmark = range.getBookmark();
				});
				//恢复IE的编辑光标
				addEvent(self.iframe, "activate", function () {
					if (bookmark) {
						var range = self.iframeDocument.body.createTextRange();
						range.moveToBookmark(bookmark);
						range.select();
						bookmark = null;
					}
				});
			}
		},
		getRange : function () {
			var contentWindow = this.iframe.contentWindow;
			var selection = null;
			var range = null;
			if (this.isIE678) { // ie6,7,8 not ie9
				selection = contentWindow.document.selection;
				range = selection.createRange();
			} else { // 标准
				selection = contentWindow.getSelection();
				range = selection.getRangeAt(0);
			}
			return range;
		},
		//insertHTML 向编辑器插入html代码
		//@param html (String||Node @@如果是ie678则传字符串，如果是标准浏览器，则传node)
		insertHTML : function (html) {
			var contentWindow = this.iframe.contentWindow;
			contentWindow.focus();
			var range = this.getRange(0);
			var selection = null;
			if (this.isIE678) {
				range.pasteHTML(html);
			} else {
				range.insertNode(html);
				range.setEndAfter(html);
				range.setStartAfter(html);
				selection = contentWindow.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
			}
		},
		execCommand : function (cmd, val) {
			try {
				this.iframeDocument.execCommand(cmd, false, val);
				this.iframe.contentWindow.focus();
			} catch (e) {}
		},
		//insertMedia 插入媒体model
		//@param media (mediaDate)
		//@param type 媒体类型
		insertMedia : function (media, type) {
			//media data插入
			if (!this.config.mediaDate[type]) {
				this.config.mediaDate[type] = [];
				this.config.mediaDateTypes.push(type);
			}
			this.config.mediaDate[type].push(media);
			var index = this.config.mediaDate[type].length;
			//渲染medias
			this.reflowMedia();
			var tag = "";
			if (type == "baobei") {
				tag = "[宝贝" + (index) + "]";
			}
			if (type == "img") {
				tag = "[图片" + (index) + "]";
			}
			if (type == "video") {
				tag = "[视频" + (index) + "]";
			}
			this.insertMediaTag(tag);
		},
		//deleteMedia 删除媒体model
		//@param type 媒体类型
		//@param index 媒体在model里的索引
		deleteMedia : function (type, index) {
			var tag = "";
			if (type == "baobei") {
				tag = "[宝贝" + (index + 1) + "]";
			}
			if (type == "img") {
				tag = "[图片" + (index + 1) + "]";
			}
			if (type == "video") {
				tag = "[视频" + (index + 1) + "]";
			}
			//media data删除
			//this.config.mediaDate[type].splice(index,1);
			this.config.mediaDate[type][index].id = "0";
			//清理多余[];
			this.deleteMediaTag(tag);
			//延时渲染medias
			setTimeout(this.reflowMedia(), 300);
		},
		//reflowMedia 重绘媒体model 每次对媒体做删除插入操作后都会重绘
		reflowMedia : function () {
			var self = this;
			var getMediasHtml = this.getMediasHtml();
			if (!self.MediaViewWrapDom || self.MediaViewWrapDom.length == 0) {
				var html = '<div class="guang-editor-mediaViewWrap clearfix"></div>';
				$(self.iframe).parents(".guang-editor").after(html);
				self.MediaViewWrapDom = $('.guang-editor-mediaViewWrap');
				self.MediaViewWrapDom.bind("click", function () {
					var e = arguments[0] || window.event,
					curElm;
					var curElm = e.srcElement ? e.srcElement : e.target;
					var $curElm = $(curElm);
					if (curElm.nodeName.toLowerCase() == 'a') {
						if ($curElm.data("behavior") == "insert") {
							self.insertMediaTag($curElm.data("tag"));
						}
						if ($curElm.data("behavior") == "delete") {
							self.deleteMedia($curElm.data("type"), parseInt($curElm.data("index"), 10))
						}
					}
				})
				$('.guang-editor-mediaViewWrap .item').live("mouseover", function () {
					$(this).find(".btn").show();
				})
				$('.guang-editor-mediaViewWrap .item').live("mouseout", function () {
					$(this).find(".btn").hide();
				})
			}
			this.MediaViewWrapDom.html(getMediasHtml);
			if (getMediasHtml.length == 0) {
				this.MediaViewWrapDom.hide();
			} else {
				this.MediaViewWrapDom.show();
			}
			this.setMediasInput4form();
		},
		//setMediasInput4form 装载提交给后台的所有媒体参数
		setMediasInput4form : function () {
			var mediasInputs = "";
			var mediaDateTypes = this.config.mediaDateTypes;
			var mediaDateTypesLength = this.config.mediaDateTypes.length;
			var mediaDate = this.config.mediaDate;
			for (var i = 0; i < mediaDateTypesLength; i++) {
				var type = mediaDateTypes[i];
				var media = mediaDate[type];
				var meidaLength = mediaDate[mediaDateTypes[i]].length;
				var value = "";
				for (var j = 0; j < meidaLength; j++) {
					if (media[j].id !== "0") {
						value += value.length ? ("," + media[j].id) : media[j].id;
					}
				}
				mediasInputs += '<input type="hidden" id="J_GuangEidtorInput_' + type + '" name="' + type + 'List" value="' + value + '"/>';
			}
			if ($("#J_GuangEidtorInput").length == 0) {
				$("#" + this.config.formId).append('<span id="J_GuangEidtorInput"></span>');
			}
			$("#J_GuangEidtorInput").html(mediasInputs)
		},
		//getMediasHtml 获取编辑器下面的所有预览媒体的html编码
		getMediasHtml : function () {
			var mediasHtml = "";
			var mediaDateTypes = this.config.mediaDateTypes;
			var mediaDateTypesLength = this.config.mediaDateTypes.length;
			var mediaDate = this.config.mediaDate;
			var getMediaHtml = function (m, type, index) {
				var tag = "",
				html = "";
				if (type == "baobei") {
					tag = "宝贝" + (index + 1);
				}
				if (type == "img") {
					tag = "图片" + (index + 1);
				}
				if (type == "video") {
					tag = "视频" + (index + 1);
				}
				html = '\
<div class="item">\
	<div class="mediaImg">\
		<img src="' + m.pic + '" alt="' + m.name + '" title="' + m.name + '">\
		<div class="btn">\
			<a href="javascript:;" data-type="' + type + '" data-behavior="insert" data-tag="[' + tag + ']" data-id="' + m.id + '">插入</a>&nbsp;|&nbsp;<a href="javascript:;" data-type="' + type + '" data-behavior="delete" data-id="' + m.id + '" data-index="' + index + '">删除</a>\
		</div>\
	</div>\
	<p>' + tag + '</p>\
</div>';
				return html;
			}
			for (var i = 0; i < mediaDateTypesLength; i++) {
				var type = mediaDateTypes[i];
				var media = mediaDate[type];
				var meidaLength = media.length;
				for (var j = 0; j < meidaLength; j++) {
					if (media[j].id !== "0") {
						mediasHtml += getMediaHtml(media[j], type, j);
					}
				}
			}
			return mediasHtml;
		},
		//insertMediaTag 插入媒体标签
		//@param tag (String) eg:"[图片1]"
		insertMediaTag : function (tag) {
			if (this.isIE678) {
				this.insertHTML(tag);
			} else {
				var textDom = this.iframeDocument.createTextNode(tag);
				this.insertHTML(textDom);
			}
		},
		//deleteMediaTag 删除媒体标签
		//@param tag (String) eg:"[图片1]"
		deleteMediaTag : function (tag) {
			var body = this.iframeDocument.body;
			var html = body.innerHTML;
			while (html.indexOf(tag) != -1) {
				html = html.replace(tag, "");
			}
			body.innerHTML = html;
			this.iframe.contentWindow.focus();
		},
		//contentDecode 内容解码
		//@param html (String)
		//@param noMediaDecode (Bool)
		contentDecode : function (html, noMediaDecode) {
			var val = html;
			var length = 0;
			var i = 0;
			var data = {};
			
			if (!this.tagsData) {
				this.tagsData = {};
				data = this.tagsData;
				//插入表情数组
				length = FACEJSON.length;
				for (; i < length; i++) {
					data[FACEJSON[i].key] = '<img src="http://static.guang.com/img/face/common/' + FACEJSON[i].val + '" unselectable="on" title="' + FACEJSON[i].key + '" alt="' + FACEJSON[i].key + '">';
				}
				//插入span font数组
				length = COLOR.length;
				i = 0;
				for (; i < length; i++) {
					var colorkey = COLOR[i].key
						data['[font' + colorkey + ']'] = '<font color="#' + colorkey + '">';
					data['[font1' + colorkey + ']'] = '<font size="1" color="#' + colorkey + '">';
					data['[font2' + colorkey + ']'] = '<font size="2" color="#' + colorkey + '">';
					data['[font3' + colorkey + ']'] = '<font size="3" color="#' + colorkey + '">';
					data['[font4' + colorkey + ']'] = '<font size="4" color="#' + colorkey + '">';
				}
				data['[font1]'] = '<font size="1">';
				data['[font2]'] = '<font size="2">';
				data['[font3]'] = '<font size="3">';
				data['[font4]'] = '<font size="4">';
				data['[/font]'] = '</font>';
				data['[span]'] = '<span>';
				data['[/span]'] = '</span>';
				
				data['[b]'] = '<b>';
				data['[/b]'] = '</b>';
				data['[p]'] = '<p>';
				data['[/p]'] = '</p>';
				data['[br]'] = '<br/>';
				data['[s]'] = '&nbsp;';
			} else {
				data = this.tagsData;
			}
			val = val.replace(/\x20?\[[^\[\]]+\]/gi, function (tag) {
					var t = tag;
					//好方法是tag[0],但ie67不支持
					//测试100W次substring(0,1)和tag.charAt(0)时间都差不多（毫秒）
					//chrome是830和760  ie7是1034和1016
					//chrome下tag[0]的时间也是760左右
					if (tag.substring(0, 1) == " ") {
						t = tag.substring(1);
					}
					return data[t] || tag;
				})
				if (!noMediaDecode) {
					val = this.mediaDecode(val);
				}
				return val;
		},
		//mediaDecode 媒体解码
		//@param html (String)
		mediaDecode : function (html) {
			var self = this;
			var val = html;
			self.tag2HtmlData = {};
			var reg_imgtag = /\[图片(\d+)\]/;
			var reg_videotag = /\[视频(\d+)\]/;
			var reg_baobeitag = /\[宝贝(\d+)\]/;
			var reg_imgtag_nopick = /\[图片\d+\]/g;
			var reg_videotag_nopick = /\[视频\d+\]/g;
			var reg_baobeitag_nopick = /\[宝贝\d+\]/g;
			if (self.mediaImgList) {
				val = val.replace(reg_imgtag_nopick, function (t) {
						var id = t.match(reg_imgtag)[1];
						self.id++;
						var hid = id + self.id;
						if (!self.imgviewDoms) {
							self.imgviewDoms = {};
						}
						if (!self.imgviewDoms[id]) {
							self.imgviewDoms[id] = [];
						}
						var length = self.imgviewDoms[id].length;
						self.imgviewDoms[id][length] = hid;
						var imgHtml = '<div class="pt10 pb10" id="J_Img_' + hid + '"></div>'
							return imgHtml;
					})
			}
			if (self.mediaVideoList) {
				var VideoLoadNum = 0;
				val = val.replace(reg_videotag_nopick, function (t) {
						VideoLoadNum++;
						if (VideoLoadNum <= self.config.videoLoadMaxNum) {
							if (self.tag2HtmlData[t]) {
								return self.tag2HtmlData[t];
							} else {
								var id = t.match(reg_videotag)[1];
								var videoHtml = "<div class='pt10 pb10'>" + self.getVideoHtml(self.mediaVideoList[id]) + "</div>";
								self.tag2HtmlData[t] = videoHtml;
								return videoHtml;
							}
						} else {
							return "";
						}
					})
			}
			if (val.indexOf("[宝贝") != -1) {
				val = val.replace(reg_baobeitag_nopick, function (t) {
						var id = t.match(reg_baobeitag)[1];
						self.id++;
						var hid = id + self.id;
						if (!self.baobeiviewDoms) {
							self.baobeiviewDoms = {};
						}
						if (!self.baobeiviewDoms[id]) {
							self.baobeiviewDoms[id] = [];
						}
						var length = self.baobeiviewDoms[id].length;
						self.baobeiviewDoms[id][length] = hid;
						return "<div class='pt10 pb10'><div id='J_Baobei_" + hid + "' class='baobei clearfix'></div></div>";
					})
			}
			return val;
		},
		//imgDecode 图片解码
		imgDecode : function () {
			var self = this;
			var callback = function (imgDom) {
				var width = parseInt(imgDom.width, 10);
				width = width > 600 ? 600 : width;
				var img = '<img width="' + width + '" src="' + imgDom.url + '"/>';
				var hids = self.imgviewDoms[imgDom.id];
				var length = hids.length;
				for (var i = 0; i < length; i++) {
					$("#J_Img_" + hids[i]).html(img);
				}
			}
			if (self.imgviewDoms) {
				for (var id in self.imgviewDoms) {
					var url = self.mediaImgList[id];
					if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
						$("#ie6img").append('<img id="img' + id + '" src="' + url + '"/>');
					} else {
						var imgDom = new Image();
						imgDom.id = id;
						imgDom.url = url;
						imgDom.onload = function () {
							callback(this);
						}
						imgDom.src = url;
					}
				}
				if ($.browser.msie && parseInt($.browser.version, 10) <= 7) {
					for (var id in self.imgviewDoms) {
						var imgHtmlDom = $("#img" + id);
						var width = imgHtmlDom.width();
						width = width > 600 ? 600 : width;
						var url = self.mediaImgList[id];
						var img = '<img width="' + width + '" src="' + url + '"/>';
						var hids = self.imgviewDoms[id];
						var length = hids.length;
						for (var i = 0; i < length; i++) {
							$("#J_Img_" + hids[i]).html(img);
						}
					}
				}
			}
		},
		//baobeiDecode 宝贝解码
		baobeiDecode : function () {
			var self = this;
			var getBaobeiHtml = function (json) {
				var baobeiId = json.baobei.id;
				var baobeiUrl = "http://guang.com/baobei/" + baobeiId;
				var baobeiName = json.baobei.name;
				baobeiName = $.guang.util.getStrLength(baobeiName) > 15 ? $.guang.util.substring4ChAndEn(baobeiName, 15) + "..." : baobeiName;
				var baobeiPhoto = json.baobei.pic;
				var baobeiRecommend = json.baobei.recommend;
				if (baobeiRecommend) {
					baobeiRecommend = baobeiRecommend.length > 40 ? baobeiRecommend.substring(0, 40) + "..." : baobeiRecommend;
				} else {
					baobeiRecommend = "";
				}
				var baobeiBrand = "";
				if (json.baobei.brandList && json.baobei.brandList.length > 0) {
					baobeiBrand += "<p>品牌：";
					for (var i = 0; i < json.baobei.brandList.length; i++) {
						var brand = json.baobei.brandList[i];
						baobeiBrand += '<a target="_blank" href="http://guang.com/pinpai/' + brand.url + '">' + brand.brandName + '</a>';
					}
					baobeiBrand += "</p>";
				}
				var tags = "";
				if (json.baobei.tags && json.baobei.tags.length > 0) {
					for (var i = 0; i < json.baobei.tags.length; i++) {
						var tag = json.baobei.tags[i].tagKeyword;
						var tagUrl = "http://guang.com/xihuan/tag/" + tag;
						tags += '<a target="_blank" href="' + tagUrl + '">' + tag + '</a>';
					}
				}
				var tagCount = json.baobei.tagCount;
				var worth = json.baobei.summary.worthCount;
				var unworth = json.baobei.summary.unworthCount;
				var Jtotal = worth + unworth;
				var Ctotal = json.baobei.commentNum;
				var priceMin = json.baobei.priceMin / 100;
				var priceMax = json.baobei.priceMax / 100;
				var html = '\
<div class="baobei-pic">\
	<a target="_blank" href="' + baobeiUrl + '"><img src="' + baobeiPhoto + '" alt="' + baobeiName + '" /></a>\
	<span>￥' + priceMin + '～' + priceMax + '</span>\
</div>\
<div class="baobei-text">\
	<h4><a target="_blank" href="' + baobeiUrl + '">' + baobeiName + '</a></h4>\
	<div class="baobei-info">\
		<p>' + baobeiRecommend + '</p>\
		' + baobeiBrand + '\
		<p>标签(' + tagCount + ')：\
		' + tags + '\
		</p>\
	</div>\
	<div class="clearfix mt15">\
		<a class="ilike-n" data-prourl="' + baobeiUrl + '" data-proimgsrc="' + baobeiPhoto + '" data-proname="' + baobeiName + '" data-type="0" data-proid="' + baobeiId + '" href="javascript:;">喜欢</a>\
		<div class="stat-box fr">\
		<a target="_blank" href="' + baobeiUrl + '">鉴定(' + worth + '/' + Jtotal + ')</a>\
		<span class="mr5 ml5">|</span>\
		<a target="_blank" href="' + baobeiUrl + '">评论(' + Ctotal + ')</a>\
		</div>\
	</div>\
</div>\
<a target="_blank" href="' + baobeiUrl + '" class="baobei-link">\
</a>';
				return html;
			}
			if (self.baobeiviewDoms) {
				for (var id in self.baobeiviewDoms) {
					$.ajax({
						url : GUANGER.path + "/editor/fetchBaobei",
						type : "post",
						dataType : "json",
						data : {
							id : id
						},
						boabeiId : id,
						success : function (json) {
							var hids = self.baobeiviewDoms[this.boabeiId];
							var length = hids.length;
							if (json) {
								if (json.code == 100) {
									var html = getBaobeiHtml(json);
									for (var i = 0; i < length; i++) {
										$("#J_Baobei_" + hids[i]).html(html);
									}
								} else {
									for (var i = 0; i < length; i++) {
										$("#J_Baobei_" + hids[i]).hide();
									}
								}
							} else {
								for (var i = 0; i < length; i++) {
									$("#J_Baobei_" + hids[i]).hide();
								}
							}
						}
					});
				}
			}
		},
		//contentEncode 内容编码
		contentEncode : function (html) {
			var self = this;
			var encodeHtml = this.filterMediaTag(html); //去掉多余的类似[图片1]
			
			var reg_spanColse = /\<span(?!.*?\<span).*?\<\/span\>/gi;
			var reg_fontColse = /\<font(?!.*?\<font).*?\<\/font\>/gi;
			var reg_bColse = /\<b(?!.*?\<b).*?\<\/b\>/gi;
			var reg_strongColse = /\<strong(?!.*?\<strong).*?\<\/strong\>/gi;
			var reg_div = /\<div[^\>]*\>/gi;
			var reg_divEnd = /\<\/div\>/gi;
			var reg_p = /\<p[^\>]*\>/gi;
			var reg_pEnd = /\<\/p\>/gi;
			var reg_br = /\<br[^\>]*\>/gi;
			var reg_img = /\<img[^>]+alt\=\"?(\[.{1,4}\])[^>]+\>/gi;
			var reg_enter = /\r|\n/g;
			var reg_nbsp = /\&nbsp\;?/gi;
			var reg_tagSplit = /\<[^\>]+\>/g;
			var SPACE = " ";
			
			//将匹配出来的闭合标签转换成"[b]xxx[/b]"之类的
			var encode = function (t, b) {
				var tagArr = t.match(reg_tagSplit);
				var tagHead = tagArr[0];
				var tagFoot = tagArr[tagArr.length - 1];
				var tagBody = t.replace(tagHead, "").replace(tagFoot, "");
				var color = null;
				var size = null;
				var bold = b || null;
				if (!bold && tagHead.indexOf("bold") != -1) {
					bold = true;
				}
				if (tagHead.indexOf("size") != -1) {
					size = tagHead.match(/size[\s\=\"]+(\d{1})/i);
					if (size) {
						size = size[1];
					}
				}
				if (tagHead.indexOf("color") != -1) {
					color = tagHead.match(/\#([0-9a-f]{6})/i);
					if (!color) {
						color = tagHead.match(/rgb\(\s?(\d{1,3})\,\s?(\d{1,3})\,\s?(\d{1,3})\)/i);
						if (color) {
							color = RGB2HEX["_" + color[1] + color[2] + color[3]];
						}
					} else {
						color = color[1];
					}
				}
				//验证是否属于网站规定的颜色
				if (!self.hasHexColor) {
					var hasHexColor = self.hasHexColor = {};
					for (var i = 0; i < COLOR.length; i++) {
						hasHexColor[COLOR[i].key] = true;
					}
				}
				if (color) {
					color = self.hasHexColor[color] ? color : null;
				}
				//验证是否属于网站规定的字体大小
				if (size && parseInt(size, 10) > 4) {
					size = "4";
				}
				if (bold) {
					if (size || color) {
						tagHead = SPACE + "[b]" + SPACE + "[font" + (size || "") + (color || "") + "]"
							tagFoot = SPACE + "[/b]" + SPACE + "[/font]";
					} else {
						tagHead = SPACE + "[b]";
						tagFoot = SPACE + "[/b]";
					}
				} else {
					if (size || color) {
						tagHead = SPACE + "[font" + (size || "") + (color || "") + "]"
							tagFoot = SPACE + "[/font]";
					} else {
						tagHead = "";
						tagFoot = "";
					}
				}
				return tagHead + tagBody + tagFoot;
			}
			//优先匹配速度快的正则
			//清除换行符
			encodeHtml = encodeHtml.replace(reg_enter, SPACE + '[span][/span]');
			//nbsp
			encodeHtml = encodeHtml.replace(reg_nbsp, SPACE + '[s]');
			//img
			if (encodeHtml.indexOf("<img") != -1 || encodeHtml.indexOf("<IMG") != -1) {
				encodeHtml = encodeHtml.replace(reg_img, SPACE + '$1');
			}
			//br
			if (encodeHtml.indexOf("<br") != -1 || encodeHtml.indexOf("<BR") != -1) {
				encodeHtml = encodeHtml.replace(reg_br, SPACE + '[br]');
			}
			//div
			if (encodeHtml.indexOf("<div") != -1 || encodeHtml.indexOf("<DIV") != -1) {
				encodeHtml = encodeHtml.replace(reg_div, SPACE + '[p]');
				encodeHtml = encodeHtml.replace(reg_divEnd, SPACE + '[/p]');
			}
			//p
			if (encodeHtml.indexOf("<p") != -1 || encodeHtml.indexOf("<P") != -1) {
				encodeHtml = encodeHtml.replace(reg_p, SPACE + '[p]');
				encodeHtml = encodeHtml.replace(reg_pEnd, SPACE + '[/p]');
			}
			//b
			while (encodeHtml.indexOf("<b") != -1 || encodeHtml.indexOf("<B") != -1) {
				encodeHtml = encodeHtml.replace(reg_bColse, function (t) {
						return encode(t, true);
					});
			}
			//strong
			while (encodeHtml.indexOf("<strong") != -1 || encodeHtml.indexOf("<STRONT") != -1) {
				encodeHtml = encodeHtml.replace(reg_strongColse, function (t) {
						return encode(t, true);
					});
			}
			//span
			while (encodeHtml.indexOf("<span") != -1 || encodeHtml.indexOf("<SPAN") != -1) {
				encodeHtml = encodeHtml.replace(reg_spanColse, function (t) {
						return encode(t);
					});
			}
			//font
			while (encodeHtml.indexOf("<font") != -1 || encodeHtml.indexOf("<FONT") != -1) {
				encodeHtml = encodeHtml.replace(reg_fontColse, function (t) {
						return encode(t);
					});
			}
			//过滤最后的标签，强制删除标签
			if (encodeHtml.indexOf("<") != -1) {
				encodeHtml = encodeHtml.replace(reg_tagSplit, '');
			}
			return encodeHtml
		},
		//filterMediaTag 过滤不存在的媒体的媒体标签
		filterMediaTag : function () {
			var html = this.iframeDocument.body.innerHTML;
			var map = {
				"宝贝" : "baobei",
				"图片" : "img",
				"视频" : "video"
			};
			var tagArr = ["宝贝", "图片", "视频"];
			var regArr_nopick = [/\[宝贝\d{1,2}\]/gi, /\[图片\d{1,2}\]/gi, /\[视频\d{1,2}\]/gi];
			var regArr = [/\[宝贝(\d{1,2})\]/, /\[图片(\d{1,2})\]/, /\[视频(\d{1,2})\]/];
			var existMediasIndex = {}; //记录存在的媒体的序列号
			var recordMoveNum = 0; //用来记录标签序号需要移动的位数，比如把[图片3]变成[图片1]，则移动位数是2
			var mediaDateTypes = this.config.mediaDateTypes;
			if (mediaDateTypes) {
				var mediaDateTypesLength = this.config.mediaDateTypes.length;
				var mediaDate = this.config.mediaDate;
				for (var i = 0; i < mediaDateTypesLength; i++) {
					var type = mediaDateTypes[i];
					var media = mediaDate[type];
					var meidaLength = mediaDate[type].length;
					for (var j = 0; j < meidaLength; j++) {
						if (media[j].id !== "0") {
							if (existMediasIndex[type]) {
								existMediasIndex[type][existMediasIndex[type].length] = j;
							} else {
								existMediasIndex[type] = [j];
							}
						}
					}
				}
			}
			for (var i = 0; i < 3; i++) {
				if (html.indexOf('[' + tagArr[i]) != -1) {
					var existTags = {};
					var changeTags = {};
					var existIndexArr = existMediasIndex[map[tagArr[i]]];
					if (existIndexArr) {
						var lastIndex = existIndexArr.length;
						for (var j = 0; j < lastIndex; j++) {
							var existTag = "[" + tagArr[i] + (existIndexArr[j] + 1) + "]";
							existTags[existTag] = true;
							if (j === 0) {
								if (existIndexArr[0] !== 0) {
									changeTags[existTag] = "[" + tagArr[i] + "1]";
									recordMoveNum = existIndexArr[0];
								}
							} else {
								if (existIndexArr[j] - existIndexArr[j - 1] !== 1 || recordMoveNum !== 0) {
									recordMoveNum += (existIndexArr[j] - existIndexArr[j - 1] - 1);
									changeTags[existTag] = "[" + tagArr[i] + (existIndexArr[j] - recordMoveNum + 1) + "]";
								}
							}
						}
						html = html.replace(regArr_nopick[i], function (t) {
								if (existTags[t]) {
									if (changeTags[t]) {
										return changeTags[t];
									} else {
										return t;
									}
								} else {
									return "";
								}
							})
					} else {
						html = html.replace(regArr_nopick[i], '');
					}
				};
			}
			return html;
		},
		//getVideoHtml 视频代码生成器
		//@param url (String)
		//@param width (Int)
		//@param height (Int)
		getVideoHtml : function (url, width, height) {
			var _width = width || 480;
			var _height = height || 400;
			var html = '<embed height="' + _height + '" width="' + _width + '" allowscriptaccess="never" style="visibility: visible;" pluginspage="http://get.adobe.com/cn/flashplayer/" flashvars="playMovie=true&amp;auto=1" allowfullscreen="true" quality="hight" src="' + url + '" type="application/x-shockwave-flash" wmode="transparent"/>';
			if ($.browser.msie) {
				html = '\
<OBJECT style="VISIBILITY: visible" classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 width=' + _width + ' height=' + _height + '>\
	<PARAM NAME="_cx" VALUE="11641">\
	<PARAM NAME="_cy" VALUE="9419">\
	<PARAM NAME="FlashVars" VALUE="playMovie=true&amp;auto=1&amp;adss=0">\
	<PARAM NAME="Movie" VALUE="' + url + '">\
	<PARAM NAME="Src" VALUE="' + url + '">\
	<PARAM NAME="WMode" VALUE="Transparent">\
	<PARAM NAME="Play" VALUE="0">\
	<PARAM NAME="Loop" VALUE="-1">\
	<PARAM NAME="Quality" VALUE="High">\
	<PARAM NAME="SAlign" VALUE="LT">\
	<PARAM NAME="Menu" VALUE="0">\
	<PARAM NAME="Base" VALUE="">\
	<PARAM NAME="AllowScriptAccess" VALUE="never">\
	<PARAM NAME="Scale" VALUE="NoScale">\
	<PARAM NAME="DeviceFont" VALUE="0">\
	<PARAM NAME="EmbedMovie" VALUE="0">\
	<PARAM NAME="BGColor" VALUE="">\
	<PARAM NAME="SWRemote" VALUE="">\
	<PARAM NAME="MovieData" VALUE="">\
	<PARAM NAME="SeamlessTabbing" VALUE="1">\
	<PARAM NAME="Profile" VALUE="0">\
	<PARAM NAME="ProfileAddress" VALUE="">\
	<PARAM NAME="ProfilePort" VALUE="0">\
	<PARAM NAME="AllowNetworking" VALUE="all">\
	<PARAM NAME="AllowFullScreen" VALUE="true">\
	<PARAM NAME="AllowFullScreenInteractive" VALUE="">\
	<div class="note_noflash">\
	<p>你还未安装flash播放器，所以无法播放。</p>\
	</div>\
	<a href="http://www.adobe.com/go/getflashplayer">\
	<img alt="获取flash播放器" src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"/>\
	</a>\
</OBJECT>';
			}
			return html;
		},
		//richText2text 将"[b]文字[/b]"转成"文本"供回复的回复使用
		//@param html (String)
		richText2text : function (html) {
			if (html) {
				var val = html;
				val = val.replace(/\[[^\]]+\]/g, "");
				return val;
			} else {
				return "";
			}
		},
		//html2text 将"<b>文字</b>"转成"文本",为了判断编辑框是否有输入内容
		//@param html (String)
		html2text : function (html) {
			if (html) {
				var val = html;
				if (val.indexOf("<img") != -1) {
					return "hasConent";
				} else {
					val = val.replace(/\<[^\>]+\>/g, "");
					val = val.replace(/\&nbsp\;/g, "");
				}
				return $.trim(val);
			} else {
				return "";
			}
		},
		//onlyDecodeFace 作用于回复的回复，该模块只让表情显示
		//@param html (String)
		onlyDecodeFace : function (html) {
			var data;
			if (!this.faceTagsData) {
				data = this.faceTagsData = {};
				for (var i = 0; i < FACEJSON.length; i++) {
					data[FACEJSON[i].key] = '<img src="http://static.guang.com/img/face/common/' + FACEJSON[i].val + '" unselectable="on" title="' + FACEJSON[i].key + '" alt="' + FACEJSON[i].key + '">';
				}
			} else {
				data = this.faceTagsData;
			}
			html = html.replace(/\[[^\[\]]+\]/gi, function (tag) {
					if (data[tag]) {
						return data[tag];
					} else {
						return "";
					}
				})
			return html;
		},
		decodeContent4Sns : function (html) {
			var data;
			if (!this.faceTagsData) {
				data = this.faceTagsData = {};
				for (var i = 0; i < FACEJSON.length; i++) {
					data[FACEJSON[i].key] = 'true';
				}
			} else {
				data = this.faceTagsData;
			}
			html = html.replace(/\[[^\[\]]+\]/gi, function (tag) {
					if (data[tag]) {
						return tag;
					} else {
						return "";
					}
				})
			html = $.guang.util.ellipse(html,140);
			return html;
		}
	}
	Editor.fn.init.prototype = Editor.fn;
	$.guang.Editor = Editor;
})(jQuery)
