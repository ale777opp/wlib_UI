/*------------------------- базовые функции ------------------------*/

var isIE=(navigator.userAgent.indexOf('MSIE')!=-1)&&(!window.opera)?true:false;
var curs=(document.compatMode=='CSS1Compat')?'pointer':'hand';
var pathActRcp="/request";
var docEl=null;
var movable=false;
var _x, _y;
var scalable=false;
var __x, __y, __xx, __yy, __l, __t, __r, __b, __w, __h, sw, sh, cx, cy, dx, dy, xm, ym;
var frmh=1000;
var arrwin=[];
var countwin=0;
var skipfirst="";
var voclab="";
var endvoc="";
var vocstart=1;
var firstterm="";
var indxterms="";
var andor=0;
var lastterm="";
var vstr="";
var vvstr="";
var numDB=0;
var wraparr=new Array();
var vocobj="vocval";
var limitlab=new Array();
limitlab["LL"]="BIBL";
limitlab["TG"]="999";
limitlab["RT"]="REC";
limitlab["SF"]="983";
limitlab["DV"]="973";
var roles=new Array();
roles["all"]="Везде";
roles["abstract"]="Аннотация";
roles["author"]="Автор";
roles["title"]="Заглавие";
roles["bbk"]="Код ББК";
roles["genre"]="Жанр/рубрика";
roles["Isbn_sn"]="ISBN/ISSN";
roles["journal"]="Наименование журнала/сборника";
roles["keywords"]="Ключевые слова";
roles["pagecount"]="К-во страниц";
roles["published"]="Год публикации";
roles["publisher"]="Издательство";
roles["series"]="Серия издания";
roles["subject"]="Дисциплина, отрасль знаний";
roles["textindex"]="Текстовый индекс (прочее)";
roles["titlealt"]="Заголовок на альтернативном языке";
roles["thumb"]="Ссылка на обложку документа";
roles["udk"]="УДК";
roles["url"]="URL-ссылка";

function getSrc(e)
{
	if(e)
		return e.target;
	else
		return event.srcElement||docEl.event.srcElement;
}

function getCode(e)
{
	e=(e)?e:(event||docEl.event);
	var code=e.keyCode;
	return code;
}

function getEtype(e)
{
	e=(e)?e:(event||docEl.event);
	return e.type;
}

function getCtrl(e)
{
	e=(e)?e:(event||docEl.event);
	var code=e.ctrlKey;
	return code;
}

function getBody()
{
	if(document.documentElement)
		return document.documentElement;
	else
		return document.body;
}

function getX(e)
{
	var doc=getBody();
	if(e)
		return e.pageX;
	else
		if(isIE)
			return event.clientX+doc.scrollLeft;
		else
			return event.clientX;
}

function getY(e)
{
	var doc=getBody();
	if(e)
		return parseInt(e.pageY);
	else
		if(isIE)
			return event.clientY+doc.scrollTop;
		else 
			return event.clientY;
}

function getXY(e)
{
	var x = 0, y = 0;
	if (!e) e = window.event;
	if (e.pageX || e.pageY)
	{
		x = e.pageX;
		y = e.pageY;
	}
	else if (e.clientX || e.clientY)
	{
		x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
		y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	}
	return {"x":x, "y":y};
}

function pageOffset()
{
	var obj={x:0,y:0};
	if(docEl==null)
	{
		if(this.nodeName)
			docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
		else
			docEl=this;
	}
	obj.x += docEl.pageXOffset || docEl.document.documentElement.scrollLeft || docEl.document.body.scrollLeft;
	obj.y += docEl.pageYOffset || docEl.document.documentElement.scrollTop  || docEl.document.body.scrollTop;
	return obj;
}

function getAbsolutePosition(elem)
{
	var obj={x:0,y:0};
	while(elem)
	{
		obj.x+=(elem.offsetLeft + elem.clientLeft);
		obj.y+=(elem.offsetTop + elem.clientTop);
		elem=elem.offsetParent;
	}
	return obj;
}

function setCursor(o)
{
	o.style.cursor=curs;
}

function setFuncStyle(o)
{
	o.style.cursor=curs;
	o.className=o.className+'_';
}

function deleteFuncStyle(o)
{
	o.className=o.className.substring(0,o.className.length-1);
}

function HighLight()
{
	this.style.color='highlighttext';
	this.style.backgroundColor='highlight';
}

function LowLight()
{
	this.style.color='';
	this.style.backgroundColor='';
}

function sendForm(queryArr,target,action,method,width,height)
{
	this.queryArr=queryArr;
	this.target=target || "_self";
	this.action=action || pathActRcp;
	this.method=method || "post";
	this.width=width || screen.availWidth;
	this.height=height || screen.availHeight;
	this.ajaxForm=ajaxForm;
}

sendForm.prototype=
{
	formSubmit: function()
	{
		var today=new Date();
		var seconds=today.getTime();
		var NameWin="n"+seconds+Math.floor(Math.random()*9999);
		var Scr="alwaysRaised=yes,menubar=yes,width=" + this.width + ",height=" + this.height +
			",left=" + parseInt(((screen.availWidth-1)-this.width)/2) + ",top=" + parseInt(((screen.availHeight-1)-this.height)/2) +
			",resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no";
		var doc, src;
		if(typeof this.target=="string")
		{
			switch(this.target)
			{
				case "_new":	var win=window.open('', NameWin, Scr);
								if(win!=null)
								{
									doc=win.document;
									src=win.name;
									doc.open();
									doc.write('<html><head><title>send</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta http-equiv="Content-Script-Type" content="text/javascript"/><meta http-equiv="cache-control" content="no-cache"/></head><body style="background: #fff; font: bold 18px Times, serif; color: red; text-align: center"><p>Пожалуйста, подождите...</p></body></html>');
									doc.close();
								}
								else
								{
									alert('Невозможно завершить операцию!\nВаш броузер блокирует всплывающие окна.');
									return;
								}
								break;
				default:	doc=document;
							src=this.target;
							break;
			}
		}
		else
		{
			doc=this.target.document;
			src=this.target.name;
		}
		var frm=doc.createElement('form');
		for(var i=0; i<this.queryArr.length; i++)
		{
			var field=doc.createElement('input');
			field.type="hidden";
			field.name=this.queryArr[i][0];
			field.value=this.queryArr[i][1];
			frm.appendChild(field);
		}
		if(doc.body!=null)
			doc.body.appendChild(frm);
		frm.action=this.action;
		frm.method=this.method;
		frm.target=src;
		frm.submit();
	}
};

var ajaxForm= 
{
	XHRobj: function ()
	{
		try
		{
			return new XMLHttpRequest() || new window.XDomainRequest();
		}
		catch(e) {}
		try
		{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) {}
		try 
		{
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch (e) {}			  	           
		return null;
	},
	send: function(arr,callback,act,hdr,callerror)
	{
		var xhr=ajaxForm.XHRobj();
		var pstr="";
		if(act==null)
			act=pathActRcp;
		if(arr!=null)
			pstr=serializeData(arr);
		if(xhr)
		{
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4)
				{
					if (xhr.status == 200)
					{
						if(callback!=null)
						{
							callback(xhr);
						}
						xhr=null;
					}
					else
					{
						if(callerror!=null)
						{
							callerror(xhr);
						}
					}
				}
			}
			if(pstr!="")
			{
				xhr.open("post", act, true);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
				//xhr.setRequestHeader("Cache-control","no-cache");
				//xhr.setRequestHeader("Content-Length", pstr.length);
				//xhr.setRequestHeader("Connection", "close");
				xhr.send(pstr);
			}
			else
			{
				xhr.open("get", act, true);
				xhr.send(null);
			}
		}
	}
};

function serializeData(arr)
{
	var qstr="";
	for(var i=0; i<arr.length; i++)
	{
		qstr+=arr[i][0]+"="+arr[i][1];
		if(i<arr.length-1)
			qstr+="&";
	}
	return qstr;
}

function prepareQueryString(arr)
{
	var qstr="";
	for(var i=0; i<arr.length; i++)
	{
		qstr+="<"+arr[i][0]+">"+arr[i][1];
		if(i<arr.length-1)
		qstr+="[separator]";
	}
	return qstr;
}

function callToRCP(qArr,trg,pathActRcp,method,w,h)
{
	var qFrm=new sendForm(qArr,trg,pathActRcp,method,w,h);
	qFrm.formSubmit();
	delete qFrm;
}

function ajaxToRCP(qArr,collback,act,hdr,collerror)
{
	var qFrm=new sendForm(qArr,collback,act,hdr,collerror);
	qFrm.ajaxForm.send(qArr,collback,act,hdr,collerror);
	delete qFrm;
}

function _take(arg)
{
	this.d=document;
	if(docEl!=null)
		this.d=docEl.document;
	if (typeof arg=='string')
		this.n=this.d.getElementById(arg);
	else
		 this.n=arg;
}

_take.prototype=
{
	text: function(arg)
	{
		var chld=new _take(this.d.createTextNode(arg));
		this.n.appendChild(chld.n);
		try
		{
			return chld;
		}
		finally
		{
			chld=null;
		}
	},
	create: function(tag,arg)
	{
		var chld=new _take(this.d.createElement(tag));
		for (key in arg)
		{
			var value = arg[key];
			if(key=='textNode')
				chld.n.appendChild(this.d.createTextNode(value));
			else if(key=='className')
				eval('chld.n.'+key+'=value');
			else if(key.substring(0,2)=='on')
				eval('chld.n.'+key+'='+value);
			else if(key=='style')
			{
				for (prop in value)
					eval('chld.n.'+key+'.'+prop+'=value[prop]');
			}
			else
			{
				chld.n.setAttribute(key, value);
			}
		}
		this.n.appendChild(chld.n);
		try
		{
			return chld;
		}
		finally
		{
			chld=null;
		}
	},
	createNS: function(NS,tag,arg)
	{
		var chld=new _take(this.d.createElementNS(NS,tag));
		for (key in arg)
		{
			var value = arg[key];
			if(key.substring(0,2)=='on')
				eval('chld.n.'+key+'='+value);
			else if(key=='style')
			{
				for (prop in value)
					eval('chld.n.'+key+'.'+prop+'=value[prop]');
			}
			else
			{
				var attr=this.d.createAttribute(key);
				chld.n.setAttributeNS(null,key,value);
			}
		}
		this.n.appendChild(chld.n);
		try
		{
			return chld;
		}
		finally
		{
			chld=null;
		}
	},
	tags: function(tag)
	{
		if(this.n!=null)
			return this.n.getElementsByTagName(tag.toLowerCase());
		else
			return;
	},
	setattr: function(NS,attr,val)
	{
		if(this.n!=null)
		{
			if(NS!=null)
			{
				this.n.removeAttributeNS(null,attr)
				return this.n.setAttributeNS(null,attr,val);
			}
			else
			{
				this.n.removeAttribute(attr)
				return this.n.setAttribute(attr, val);
			}
		}
		else
			return;
	},
	getpart: function(NS,tag,sign)
	{
		if(this.n!=null)
		{
			var arr=new Array();
			var parr=[];
			if(NS!=null)
				parr=this.d.getElementsByTagNameNS(NS,tag.toLowerCase());
			else
				parr=this.n.getElementsByTagName(tag.toLowerCase());
			for (var i=0; i<parr.length; i++)
			{
				for(var key in sign)
				{
					if(eval("parr[i]."+key).indexOf(sign[key])!=-1)
						arr.push(parr[i]);
				}
			}
			try
			{
				return arr;
			}
			finally
			{
				arr=null;
			}
		}
	},
	getsign: function(tag,sign)
	{
		if(this.n!=null)
		{
			var arr=new Array();
			var parr=this.n.getElementsByTagName(tag.toLowerCase());
			for (var i=0; i<parr.length; i++)
			{
				for(var key in sign)
				{
					if(key=='className')
					{
						var tmp = new RegExp("(^|\\s)" + sign[key]+ "(\\s|$)");
						if(tmp.test(parr[i].className))
							arr.push(parr[i]);
					}
					else
					{
						if(sign[key]=='')
						{
							if(eval("parr[i]."+key))
								arr.push(parr[i]);
						}
						else
						{
							if (eval("parr[i]."+key)==sign[key])
								arr.push(parr[i]);
						}
					}
				}
			}
			try
			{
				return arr;
			}
			finally
			{
				arr=null;
			}
		}
	},
	getx: function()
	{
		return this.n.offsetLeft;
	},
	gety: function()
	{
		return this.n.offsetTop;
	},
	getw: function()
	{
		return this.n.offsetWidth;
	},
	geth: function()
	{
		return this.n.offsetHeight;
	},
	getb: function()
	{
		return this.n.offsetHeight+this.n.offsetTop;
	},
	getr: function()
	{
		return this.n.offsetWidth+this.n.offsetLeft;
	},
	setx: function(x)
	{
		return this.n.style.left=x+"px";
	},
	sety: function(y)
	{
		return this.n.style.top=y+"px";
	},
	setw: function(w)
	{
		if(w<0)
			return;
		else
			return this.n.style.width=w+"px";
	},
	seth: function(h)
	{
		if(h<0)
			return;
		else
			return this.n.style.height=h+"px";
	},
	transparency: function(arg)
	{
		if(this.n!=null)
		{
			var support = "opacity" in this.n.style;
			if(support)
				return (arg!=10)?this.n.style.opacity='0.'+arg:this.n.style.opacity='10';
			else
				return (arg!=10)?this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+'0)':this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
		}
		else
			return;
	},
	fade: function(arg)
	{
		if(this.n!=null)
		{
			var support = "opacity" in this.n.style;
			if(support)
				return this.n.style.opacity=arg/100;
			else
				return this.n.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+arg+')';
		}
		else
			return;
	},
	visualise: function()
	{
		if(this.n!=null)
			return this.n.style.visibility="visible";
		else
			return;
	},
	conceal: function()
	{
		if(this.n!=null)
			return this.n.style.visibility="hidden";
		else
			return;
	},
	show: function()
	{
		if(this.n!=null)
			return this.n.style.display="";
		else
			return;
	},
	hide: function()
	{
		if(this.n!=null)
			return this.n.style.display="none";
		else
			return;
	},
	addevent: function(e,t,f)
	{
		if(this.d.addEventListener)
			this.d.addEventListener(e,t,false);
		else
			eval('this.d'+'.on'+e+'='+'t');
	},  
	stopevent: function(event)
	{
		if(this.d.stopPropagation)
			this.d.stopPropagation();
		else
			this.d.cancelBubble=true;
	},  
	delevent: function(t,f)
	{
		if(this.d.attachEvent)
			this.d.detachEvent('on'+t,f,true);
		else
			this.d.removeEventListener(t,f,false);
	}
};

function take(arg)
{
	return new _take(arg);
}

var delta_x = 0;
var delta_y = 0;
var delta_w = 0;
var delta_h = 0;
var w_block = 0;
var h_block = 0;

function startMove(e)
{
	movable=true;
	var o;
	var c;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		c=e.srcElement;
		o=e.srcElement.parentNode.parentNode;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		c=e.target;
		o=e.target.parentNode.parentNode;
		x = e.pageX;
		y = e.pageY;
	}
	if(c.className=='pheader')
	{
		delta_x = o.offsetLeft - x;
		delta_y = o.offsetTop - y;
		o.onmousemove = moveThis;
	}
}

function stopMove(e)
{
	movable=false;
	document.onmousemove = null;
	e = e || window.event;
	(e.stopPropagation) ? e.stopPropagation() : e.cancelBubble=true;
}

function moveThis(e)
{
	if(!movable)
		return;
	var o;
	var c;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		c=e.srcElement;
		o=e.srcElement.parentNode.parentNode;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		c=e.target;
		o=e.target.parentNode.parentNode;
		x = e.pageX;
		y = e.pageY;
	}
	if(docEl.getSelection)
		docEl.getSelection().removeAllRanges();
    else
		if(docEl.document.selection && docEl.document.selection.clear)
			docEl.document.selection.clear();
	if(c.className=='pheader')
	{
		o.style.top = delta_y + y + "px";
		o.style.left = delta_x + x + "px";
	}
}

function startScale(e)
{
	scalable=true;
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		o=e.target;
		x = e.pageX;
		y = e.pageY;
	}
	if(o.className.indexOf('dialog')!=-1)
	{
		var obj=take(o);
		__l=obj.getx();
		__t=obj.gety();
		__x=x + pageOffset().x-obj.getx();
		__y=y + pageOffset().y-obj.gety();
		__w=obj.getw();
		__h=obj.geth();
		__r=obj.getr();
		__b=obj.getb();
		__xx=x + pageOffset().x;
		__yy=y + pageOffset().y;
		obj=null;
		o.onmousemove=toScale;
	}
}

function stopScale(e)
{
	scalable=false;
	document.onmousemove = null;
	e = e || window.event;
	(e.stopPropagation) ? e.stopPropagation() : e.cancelBubble=true;
}

function toScale(e)
{
	if(!scalable)
		return;
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
		x = e.clientX;
		y = e.clientY;
	}
	else
	{
		o=e.target;
		x = e.pageX;
		y = e.pageY;
	}
	if(docEl.getSelection)
		docEl.getSelection().removeAllRanges();
    else
		if(docEl.document.selection && docEl.document.selection.clear)
			docEl.document.selection.clear();
	if(o.className.indexOf('dialog')!=-1)
	{
		var obj=take(o);
		var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:window.innerHeight;
		var w=(isIE)?docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth:docEl.innerWidth;
		var oX = parseInt(o.style.left);
		var oY = parseInt(o.style.top);
		var oW = o.offsetWidth;
		var oH = o.offsetHeight;
		cx=e.clientX + pageOffset().x;
		cy=e.clientY + pageOffset().y;
		dx=cx-__x;
		dy=cy-__y;
		xm=__r-oW/2;
		ym=__b-oH/2;
		var minw=100;
		var minh=100;
		if((cx==xm)||(cy==ym))
		{
			obj=null;
			return;
		}
		if(cx<xm)
		{
			sw=__r-dx;
		}
		if(cx>xm)
		{
			sw=__w+(cx-__xx);
			dx=oX;
		}
		if(cy>ym)
		{
			sh=__h+(cy-__yy);
			dy=__t;
		}
		if(cy<ym)
		{
			sh=__b-dy;
		}

		if(obj.gety()<pageOffset().y)
		{
			dy=pageOffset().y;
			sh=__b-dy;
		}
		if(obj.getx()<pageOffset().x)
		{
			dx=pageOffset().x;
			sw=__r-dx;
		}
		if((obj.getr()-pageOffset().x)>w)
			sw=w-__l-5;
		if((obj.getb()-pageOffset().y)>h)
			sh=h-__t-5;
		if((sw>minw)&&(sh>minh))
		{
			obj.setx(dx);
			obj.sety(dy);
			obj.setw(sw);
			obj.seth(sh);
			var fobj=take(o.firstChild);
			var lobj=take(o.firstChild.lastChild);
			fobj.setw(sw-10);
			fobj.seth(sh-10);
			lobj.setw(sw-10);
			lobj.seth(sh-35);
			__r=dx+sw;
			__b=dy+sh;
			__l=dx;
			__t=dy;
			__w=sw;
			__h=sh;
			__xx=cx;
			__yy=cy;
			fobj=null;
			lobj=null;
			obj=null;
		}
	}
}

function stopEffects(e)
{
	movable=false;
	scalable=false;
	document.onmousemove = null;
	e = e || window.event;
	(e.stopPropagation) ? e.stopPropagation() : e.cancelBubble=true;
}

function unWrapLayer(e)
{
	stopEffects();
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
	}
	else
		o=e.target;
	o.className='wrap';
	o.onmousedown=wrapLayer;
	o.title='Развернуть';
	var doc=o.parentNode.parentNode.parentNode;
	var tdoc=take(doc);
	var ind=doc.id;
	hideBgDiv(ind+'bgdiv');
	if(typeof (wraparr[ind])=='undefined')
		wraparr[ind]=new Array();
	if(wraparr[ind].length!=0)
		wraparr[ind].length=0;
	wraparr[ind]=([tdoc.getw(),tdoc.geth()]);
	tdoc.seth(40);
	var fobj=take(doc.firstChild);
	var lobj=take(doc.lastChild);
	var llobj=take(doc.lastChild.lastChild);
	fobj.seth(40);
	lobj.seth(32);
	llobj.hide();
	tdoc.setx(0);
	var h=(isIE)?docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight:docEl.innerHeight;
	tdoc.sety(h-40);
	doc.style.overflow='hidden';
	tdoc=fobj=lobj=llobj=null;
}

function wrapLayer(e)
{
	stopEffects();
	var o;
	if(isIE)
	{
		if(docEl==null)
		{
			if(this.nodeName)
				docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
			else
				docEl=this;
		}
		e=docEl.event||this.ownerDocument.parentWindow.event;
		o=e.srcElement;
	}
	else
		o=e.target;
	o.className='unwrap';
	o.onmousedown=unWrapLayer;
	o.title='Свернуть';
	var doc=o.parentNode.parentNode.parentNode;
	var tdoc=take(doc);
	var ind=doc.id;
	showBgDiv(ind+'bgdiv');
	var y=(isIE)?((docEl.document.body.clientHeight||docEl.document.documentElement.clientHeight)-wraparr[ind][1])/2:(docEl.innerHeight-wraparr[ind][1])/2;
	var x=(isIE)?((docEl.document.body.clientWidth||docEl.document.documentElement.clientWidth)-wraparr[ind][0])/2:(docEl.innerWidth-wraparr[ind][0])/2;
	tdoc.setx(x);
	tdoc.sety(y);
	var fobj=take(doc.firstChild);
	var lobj=take(doc.lastChild);
	var llobj=take(doc.lastChild.lastChild);
	fobj.seth(wraparr[ind][1]);
	lobj.seth(wraparr[ind][1]-10);
	llobj.show();
	tdoc.seth(wraparr[ind][1]);
	tdoc.setw(wraparr[ind][0]);
	var i=0;
	for(var key in wraparr)
	{
		if(key==ind)
		{
			wraparr.splice(i,1);
			break;
		}
		i++;
	}
	tdoc=fobj=lobj=llobj=null;
}

function findArrIndex(k,arr)
{
	var l=arr.length;
	for(var i=0; i<l; i++)
	{
		if(arr[i][1].id == k)
		{
			return i;
		}
	}
	return -1;
}

function delLayerWin(ind,arg)//скрытие/удаление окна с iframe
{
	try
	{
		var i=arrwin.length-1;
		var par=arrwin[i][0];
		var div=arrwin[i][1];
		var arg=arrwin[i][2];
		var target=arrwin[i][3];
		if(div.id.indexOf('rubwin')!=-1)
			if(take('uploadform').n!=null)
			{
				take('uploadform').n.reset();
				take('uploadform').hide();
				document.body.appendChild(take('uploadform').n);
			}
		arrwin.splice(i,1);
		countwin--;
		deleteBgDiv(div);
		par.removeChild(div);
		if(isIE)
			visualiseSelect();
		take(document.body).seth(frmh);
		take(document.body).n.style.overflow='';
		if(arg!="")
			eval(arg);
		if(target!=null)
		{
			target.scrollIntoView();
		}
		scrollobj=null;
	}
	catch(e){};
}

function createBgDiv(ind,count)
{
	if(docEl==null)
	{
		if(this.nodeName)
			docEl=this.ownerDocument.defaultView||this.ownerDocument.parentWindow;
		else
			docEl=this;
	}
	var container=docEl.document.body;
	var tcontainer=take(container);
	var bgdiv=tcontainer.create('div',{id: ind, className: 'bgdiv', style: {position:'absolute', top: '0px', left: '0px', width: container.scrollWidth+'px', height: container.scrollHeight+'px', zIndex: 99999+count}});
	bgdiv.transparency(5);
	if(isIE)
	{
		var div=take(ind);
		if(div.n.previousSibling)
		{
			if((div.n.previousSibling.previousSibling)&&(div.n.previousSibling.previousSibling.id.indexOf('win')!=-1))
			{
				var par=div.n.previousSibling.previousSibling;
				var tpar=take(par);
				tpar.hide();
				tpar=null;
			}
		}
		div=null;
	}
	return bgdiv;
}

function deleteBgDiv(ind)
{
	if(typeof ind!="string")
		ind=ind.previousSibling;
	var div=take(ind);
	if(div.n!=null)
	{
		if(isIE)
		{
			if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
			{
				var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;
				var tpar=take(par);
				tpar.show();
				tpar=null;
			}
		}
		div.n.parentNode.removeChild(div.n);
		div=null;
	}
	return;
}

function hideBgDiv(ind)
{
	var div=take(ind);
	if(div.n!=null)
	{
		div.hide();
		if(isIE)
		{
			if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
			{
				var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;
				var tpar=take(par);
				tpar.show();
				tpar=null;
			}
		}
	}
	div=null;
	return;
}

function showBgDiv(ind)
{
	var div=take(ind);
	if(div.n!=null)
	{
		div.show();
		if(isIE)
		{
			if((div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling)&&(div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling.id.indexOf('win')!=-1))
			{
				var par=div.n.parentNode.lastChild.previousSibling.previousSibling.previousSibling;
				var tpar=take(par);
				tpar.hide();
				tpar=null;
			}
		}
	}
	div=null;
	return;
}

function showLayerWin(ind,arg)
{
	var msg=layopen=layclose=divframe=callback=disabled="";
	var t=w=h=len=0;
	var src="about:blank";
	var callbackname="Выполнить";
	var cls="dialog";
	var browsed="";
	var forlinks="";
	var closename="Закрыть";
	var multipart="application/x-www-form-urlencoded";
	var dispatcher="closeThisWin";
	var closeel=null;
	docEl=self;
	if(arg!=null)
	{
		for (var key in arg)
		{
			var value = arg[key];
			if(key=='target')/*где строить окно*/
				docEl=eval(value);
			if(key=='cls')/*стиль окна*/
				cls=value;
			if(key=='browsed')/*просмотр ЭД*/
				browsed=value;
			if(key=='forlinks')/*ссылки*/
				forlinks=value;
			if(key=='message')/*имя окна*/
				msg=value;
			if(key=='src')/*если divframe:1, - src iframe*/
				src=value;
			else if(key=='width')/*ширина окна*/
				w=value;
			else if(key=='height')/*высота окна*/
				h=value;
			else if(key=='layopen')/*сворачивание фреймсета*/
				layopen=value;
			else if(key=='layclose')/*разворачивание фреймсета*/
				layclose=value;
			else if(key=='divframe')/*если divframe:1, - строить iframe*/
				divframe=value;
			else if(key=='callback')/*если есть кнопка "Выполнить" - функция, которая выполняется по нажатию*/
				callback=value;
			else if(key=='callbackname')/*если есть кнопка "Выполнить" - ее название*/
				callbackname=value;
			else if(key=='closename')/*кнопка "Закрыть" - ее название*/
				closename=value;
			else if(key=='multipart')/*если файл - multipart/form-data*/
				multipart=value;
			else if(key=='dispatcher')/*если нужен особый обработчик ESC / ENTER*/
				dispatcher=value;
			else if(key=='disabled')/*если есть кнопка "Выполнить" и она по умолчанию неактивна*/
				disabled=value;
		}
		if(layopen!="")
			eval(layopen);
	}
	if(browsed=="")
	{
		docEl.scrollTo(0,0);
		docEl.document.body.style.overflow='hidden';
	}
	var ww=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.clientWidth:docEl.document.body.clientWidth;
	var dl=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.scrollLeft:docEl.document.body.scrollLeft;
	var dt=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.scrollTop:docEl.document.body.scrollTop;
	var hw=document.compatMode=='CSS1Compat' && !window.opera?docEl.document.documentElement.clientHeight:docEl.document.body.clientHeight;
	var container=(docEl!=null)?docEl.document.body:document.body;
	var tcontainer=take(container);
	if(browsed=="")
	{
		if(w=="")
			w=ww-20;
		else
		{
			if(w.indexOf('%')!=-1)
				w=ww/100*(w.substring(0,w.length-1));
		}
		if(h=="")
			h=hw-20;
		else
		{
			if(h.indexOf('%')!=-1)
				h=hw/100*(h.substring(0,h.length-1));
		}
		len=(ww-w)/2+dl;
		t=(hw-h)/2+dt;
	}
	else
	{
		w=ww-2;
		h=hw-2;
		len=10+dl;
		t=1+dt;
	}
	if(forlinks!="")
	{
		w=w-100;
		len=len+50;
	}
	var inner=null;
	var bgdiv=null;
	var div=null;
	if((cls=='dialog')||(cls=='dialog2'))
	{
		if(browsed!="")
		{
			if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1)
			{
				w=screen.availWidth-10;
				h=screen.availHeight-60;
			}
			div=tcontainer.create('div',{className: 'dialog3', style: {background:'#fff',width: w+'px', height: (h-30)+'px', zIndex: 99999+top.countwin+1, overflow: 'hidden', margin: '0px', padding: '0px'}, id: ind+''+top.countwin});
			inner=div.create('div',{style: {border:'none', margin: '0px',padding:'0px', background: '#fff', width: w+'px', height: (h-30)+'px', overflow: 'hidden', cursor: 'default', zIndex: 99999+top.countwin+2}});
			closeel=1;
		}
		else
		{
			bgdiv=createBgDiv(ind+''+countwin+'bgdiv',countwin);
			div=tcontainer.create('div',{className: cls, style: {width: w+'px', height: h+'px', zIndex: 99999+countwin+1, overflow: 'hidden', margin: '0px', padding: '0px', cursor: 'se-resize'}, id: ind+''+countwin, onmousedown: 'startScale', onmouseup: 'stopScale', onmouseout: 'stopScale', onmouseover: 'stopScale'});
			var inner=div.create('div',{style: {border:'none', margin: '5px',padding:'0px', background: '#fff', width: (w-10)+'px', height: (h-10)+'px', overflow: 'hidden', cursor: 'default', zIndex: 99999+countwin+2}});
			var p=inner.create('p',{textNode:msg,className: 'pheader', style:{textAlign:'center',zIndex: 99999+countwin+3}, onmousedown: 'startMove', onmouseup: 'stopMove', onmouseout: 'stopMove', onmouseover: 'stopMove'});
			p.create('span',{textNode: 'X', title: 'Закрыть', className: 'del', onmousedown: dispatcher});
			p.create('span',{textNode: '_', title: 'Свернуть', className: 'unwrap', onmousedown: unWrapLayer});
		}
		if(divframe!="")
		{
			var theh=(browsed!="")?(h-30):(h-35);
			var thew=(browsed!="")?w:(w-10);
			var ifr=null;
			if(forlinks=="")
			{
				ifr=inner.create('iframe',{name: ind+'frame', id: ind+'frame', style: {width: thew+'px', height: theh+'px', zIndex: 99999+countwin+4}, border: '0', frameBorder: '0', marginWidth: '0', marginHeight: '0', scrolling: 'no', src: src});
			}
			else
			{
				ifr=inner.create('iframe',{name: ind+'frame', id: ind+'frame', style: {width: (w-10)+'px', height: (h-125)+'px', zIndex: 99999+countwin+4}, frameborder: '0', marginwidth: '0', marginheight: '0', scrolling: 'no', src: src});
				var pin=inner.create('p',{style: {textAlign: 'center',marginTop: '10px'}});
				pin.create('input', {className: 'button', id: 'closebut',value: closename, onmousedown: dispatcher, type: 'button'});
				pin=null;
			}
			ifr=null;
		}
		else
		{
			var frm=null;
			frm=inner.create('form',{id: ind+'form', enctype: multipart,onsubmit: 'function(){return false;}', className: 'winform', style: {background: '#fff', cursor: 'default', margin: '0px', padding: '0px', overflow: 'auto', width: '100%', height: (h-100)+'px'}});
			var lpc=frm.create('div',{style: {font: 'normal 10pt/24pt Arial', padding: '10px 0 10px 50px'},  textNode: 'Пожалуйста, подождите ...'});
			lpc.n.innerHTML+='<div class="progress small"><div></div></div>';
			var pin=null;
			if(forlinks=="")
			{
				 pin=inner.create('p',{style: {textAlign: 'center'}});
				if(callback!="")
				{
					if(disabled!="")
						pin.create('input', {className: 'button', id: 'callbut', value: callbackname, onkeyup: callback, onmousedown: callback, type: 'button', disabled: 'true'});
					else
						pin.create('input', {className: 'button', id: 'callbut', value: callbackname, onkeyup: callback, onmousedown: callback, type: 'button'});
				}
				pin.create('input', {className: 'button', id: 'closebut',value: closename, onmousedown: dispatcher, type: 'button'});
			}
			frm=pin=null;
		}
	}
	else
	{
		var div=tcontainer.create('div',{className: cls, style: {zIndex: 99999+countwin+1, margin: '0px', padding: '0px'}, id: ind+''+countwin});
		var frm=div.create('form',{id:ind+'form'});
		if(cls=='loader')
		{
			var lpc=frm.create('div',{style: {font: 'normal 10pt/24pt Arial', padding: '10px 0 10px 50px'},  textNode: 'Пожалуйста, подождите ...'});
			lpc.n.innerHTML+='<div class="progress small"><div></div></div>';
		}
		else
		{
			var lpc=frm.create('div',{style: {width:'100%',height:'100%'}});
			lpc.n.innerHTML+='<div class="progress"><div></div></div>';
		}
	}
	if(closeel==null)
		div.addevent('keyup',eval(dispatcher));
	arrwin[countwin]=[div.n.parentNode,div.n,layclose,scrollobj];
	countwin++;
	frmh=container.clientHeight||window.innerHeight;
	if(browsed=="")
	{
		container.style.overflow="hidden";
	}
	div.setx(len);
	div.sety(t);
	tcontainer=bgdiv=div=inner=p=null;
	return;
}

function closeThisWin(event)
{
	stopEffects(event);
	var etype=getEtype(event).toLowerCase();
	if(etype=='keyup')
	{
		var Key=getCode(event);
		if(Key==27)
		{
			delLayerWin();
			return false;
		}
		else
			return;
	}
	else
	{
		delLayerWin();
		return false;
	}
}

function replaceSlash(val)
{
	val=val.replace(/\\/g,'\\\\');
	return val;
}
function encodeVal(s)
{
	var encodeval=encodeURIComponent(s);
	encodeval=encodeval.replace(/~/g,'%7E');
	encodeval=encodeval.replace(/!/g,'%21');
	encodeval=encodeval.replace(/\(/g,'%28');
	encodeval=encodeval.replace(/\)/g,'%29');
	encodeval=encodeval.replace(/'/g,'%27');
	encodeval=encodeval.replace(/\%20/g,'+');
	return encodeval;
}

function replaceSymb(val)
{
	val=val.replace(/\\/g,'\\\\');
	val=val.replace(/\"/g,'\\\"');
	val=val.replace(/\'/g,"\\\'");
	return val;
}
function Trim(val)
{
	val=val.replace(/^\.   \,   `\-*/g,'');
	val=val.replace(/^\.   \,   \-*/g,'');
	val=val.replace(/^\.   \,  \-*/g,'');
	val=val.replace(/^\.   \-*/g,'');
	val=val.replace(/^\. */g,'');
	return val;
}

function Trim1(val)
{
	val=val.replace(/\.* *\, *`\-*/g,'');
	val=val.replace(/\.* *\, *\-*/g,'');
	val=val.replace(/\.* *\, *\-*/g,'');
	val=val.replace(/\. *\-*/g,'');
	val=val.replace(/^\. */g,'');
	return val;
}

function trimSpaces(val)
{
	val=val.replace(/^\s*/g,'');
	val=val.replace(/\s*$/g,'');
	return val;
}

function unique(u)
{
	var result = [], i = 0, j = 0, length = u.length;
	while (i < length)
	{
		var I = u[i++][0], k = j;
		while (k-- && result[k][0] !== I);
		if (k < 0) result[j++] = [I,u[i-1][1]];
	}
	return result;
}

function WriteError(t,h)
{
	var arg={'message':'ОШИБКА','target':self,'width':'500','height':'350'};
	if(h!=null)
		arg["dispatcher"]='function hgo(){history.go(-1);}';
	showLayerWin('errorwin',arg);
	var text="";
	if(typeof t._message_0!="undefined")
		text+=t._message_0;
	var div=take('errorwinform');
	div.n.innerHTML="";
	var p=div.create('p',{style: {font: 'normal 10pt/24pt Arial', padding: '50px 20px 10px 20px', textAlign: 'center'},  textNode: text});
	if(typeof t._action_0!="undefined")
		p.text(t._action_0);
}

function concealSelect()
{
	var arr=take('frm').tags('select');
	for(var i=0; i<arr.length; i++)
	{
		arr[i].style.visibility='hidden';
	}
}

function visualiseSelect()
{
	var arr=take('frm').tags('select');
	for(var i=0; i<arr.length; i++)
	{
		arr[i].style.visibility='visible';
	}
}

function getcNode(rNode)
{
	var cNode=null;
	if(rNode.hasChildNodes())
	{
		var children = rNode.childNodes;
		for(var j=0; j<children.length; j++)
		{
			if(children[j].nodeType==1)
			{
				cNode=children[j];
				break;
			}
		}
	}
	return cNode;
}

function getcNodeByName(rNode,name)
{
	var cNode=null;
	if(rNode.hasChildNodes())
	{
		var children = rNode.childNodes;
		for(var j=0; j<children.length; j++)
		{
			if(children[j].nodeType==1)
			{
				if(children[j].nodeName.toLowerCase()==name)
				{
					cNode=children[j];
					break;
				}
			}
		}
	}
	return cNode;
}
/*------------------------- конец базовые функции ------------------*/

/*------------------------- настройка проекта ------------------*/
function addElement()
{
	var par=this.parentNode;
	var grand=par.parentNode;
	var today=new Date();
	var el=par.cloneNode(true);
	/*take(el).getpart(null,'span',{className:'plus'})[0].onclick=addElement;
	take(el).getpart(null,'span',{className:'minus'})[0].onclick=delElement;*/
	var arr=take(el).getpart(null,'img',{src:'e.gif'});
	var arr1=take(el).getsign('input',{disabled:''});
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i].parentNode.className.indexOf('plus')!=-1)
			arr[i].parentNode.onclick=addElement;
		if(arr[i].parentNode.className.indexOf('minus')!=-1)
			arr[i].parentNode.onclick=delElement;
		if(arr[i].parentNode.className=='down')
			arr[i].parentNode.onclick=ToEnd;
		if(arr[i].parentNode.className=='up')
			arr[i].parentNode.onclick=ToBegin;
		if(arr[i].parentNode.className=='downone')
			arr[i].parentNode.onclick=ToDownOne;
		if(arr[i].parentNode.className=='upone')
			arr[i].parentNode.onclick=ToUpOne;
	}
	for(var i=0; i<arr1.length; i++)
	{
		if(arr1[i].disabled)
			arr1[i].disabled=false;
	}
	grand.appendChild(el);
}

function delElement()
{
	var par=this.parentNode;
	var grand=par.parentNode;
	if(par.className=='addqueries')
	{
		if((par.nextSibling && par.nextSibling.className=='addqueries') || (par.previousSibling && par.previousSibling.className=='addqueries'))
			grand.removeChild(par);
		else
			return;
	}
	else
	{
		grand.removeChild(par);
	}
}

function ToUpOne(o)
{
	var par=this.parentNode;
	var grand=par.parentNode;
	if((par.previousSibling!=null)&&(par.previousSibling.nodeName.toLowerCase()!='span')&&(par.previousSibling.firstChild.className!='button')&&(par.previousSibling.id!='search_all_bases'))
		grand.insertBefore(par,par.previousSibling);
}

function ToDownOne(o)
{
	var par=this.parentNode;
	var grand=par.parentNode;
	if(par.nextSibling!=null)
		grand.insertBefore(par.nextSibling,par);
}

function ToBegin(o)
{
	var par=this.parentNode;
	var grand=par.parentNode;
	var num=1;
	if(grand.childNodes[1].id=='search_all_bases')
		num=2;
	grand.insertBefore(par,grand.childNodes[num]);
}

function ToEnd(o)
{
	var par=this.parentNode;
	var grand=par.parentNode;
	grand.appendChild(par);
}

function showHide(o)
{
	var obj=o.parentNode.nextSibling;
	if(obj!=null)
	{
		obj.style.display=(obj.style.display=="none")?"":"none";
		o.title=(o.title=="Развернуть")?"Свернуть":"Развернуть";
		o.className=(o.className.indexOf('_')!=-1)?o.className.substring(0,o.className.indexOf('_')):o.className+'_';
	}
}

function showHideAll()
{
	var arr=take('frm').getsign('span',{className: 'wrap_'});
	for(var i=0; i<arr.length; i++)
	{
		showHide(arr[i]);
	}
}

function nextSettings(step)
{
	switch(step)
	{
		case 1: savePath();
		break;
		case 2: showInterface();
		break;
		case 3: iddbSettings();
		break;
		case 4: saveSettings();
		break;
		case 5: createInterface();
		break;
		case 6: showEditor();
		break;
		default:
		break;
	}
}

function putCheck()
{
	this.checked=true;
	if(this.id=='sd')
		take('rd').n.checked=false;
	else
		take('sd').n.checked=false;
}
var scrollobj=null;

function loadRubricator(num)
{
	var arg={};
	arg.message='ЗАГРУЗИТЬ РУБРИКАТОР';
	arg.width='750';
	arg.height='400';
	scrollobj=take('alias_'+num).n;
	showLayerWin('rubwin',arg);
	var div=take('rubwinform');
	div.n.innerHTML="";
	var frm=take('uploadform');
	div.n.parentNode.insertBefore(frm.n,div.n);
	//div.n.appendChild(frm.n);
	frm.n.fname.value=take('fname_'+num).n.value;
	frm.n.dbname.value=num;
	frm.n.flabel.value=take('rublabel_'+num).n.value;
	frm.show();
}

function backLoadRubricator(t)
{
	if(typeof t.error!="undefined")
	{
		WriteError(t.error);
	}
	else
	{
		var doc=take('rubwinform');
		document.body.appendChild(take('uploadform').n);
		take('uploadform').hide();
		doc.create('p',{textNode:t.text,style:{textAlign:'center',fontWeight:'bold'}});
		var cNode=take('rubbut_'+t.dbname).n;
		var par=cNode.parentNode;
		take(par).create('p',{id:'realrubpath_'+t.dbname, textNode: t.path});
		take(par).create('p',{id:'rublabel_'+t.dbname, textNode: t.flabel});		
		var iNode=take('nam_'+t.dbname).n;
		var span=take(par).create('span',{textNode:iNode.value, id: iNode.id});
		par.removeChild(iNode.nextSibling);
		par.replaceChild(span.n,iNode);
		par.removeChild(cNode.previousSibling);
		par.removeChild(cNode);
		delLayerWin();
	}
}

function iddbSettings()
{
	if(((take('fundholders').n.checked)&&((isNaN(take('fundnumber').n.value))||(take('fundnumber').n.value=="")))||((!take('simple').n.checked)&&(!take('expand').n.checked)&&(!take('professional').n.checked)))
	{
		alert('Вы не заполнили обязательные поля или заполнили их неправильно!');
		return;
	}
	showHideAll();
	if(take('chooseaction1').n!=null)
	{
		var par=take('chooseaction1').n.parentNode;
		var grand=par.parentNode;
		grand.removeChild(par);
	}
	var doc=take('frm');
	var div=doc.create('div');
	div.create('input',{className:'wr',id:'wi2',name:'wi2',type:'checkbox',checked:true});
	div.create('label',{className: 'wrapped', 'for': 'wi2', textNode: 'Настройка баз данных'});
	var container=div.create('div',{className:'expl',style:{border:'solid 1px #ddd', background: '#f6f6f6'}});
	var choice=container.create('span',{id:'choice'});
	var span=choice.create('span');
	span.create('input',{'type':'radio',id:'nd','name':'choosedisplay','value':'none',onclick:'putCheck',checked:true});
	span.create('label',{'for':'nd',textNode:'Не отображать в интерфейсе'});
	choice.create('br',{style: {clear: 'both'}});
	var span0=choice.create('span');
	span0.create('input',{'type':'radio',id:'rd','name':'choosedisplay','value':'radio',onclick:'putCheck'});
	span0.create('label',{'for':'rd',textNode:'Выбор баз данных путем переключения (RADIO BUTTON)'});
	choice.create('br',{style: {clear: 'both'}});
	var span1=choice.create('span');
	span1.create('input',{'type':'radio',id:'sd','name':'choosedisplay','value':'select',onclick:'putCheck'});
	span1.create('label',{'for':'sd',textNode:'Выбор баз данных из списка выбора (SELECT)'});
	/*----------------------*/	
		var adc=container.create('div',{id:'search_all_bases',className:'white',style:{display:'none'}});
		var apc=adc.create('p',{style:{width:'80%'},className:'BIBL'});
		apc.create('span',{onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'База данных: '});
		var apinp=apc.create('input',{id:'sallb',className: 'bases',type: 'checkbox', name: 'MULTI', value: 'all', title:'BIBL', onclick: 'displayType'});
		apc.create('b',{className: 'nam1',textNode:'Все базы'});
		var aspan=apc.create('span',{className:'block',style: {width:'550px'}});
		aspan.create('input',{className: 'alias',type: 'text', id: 'alias_all', name: 'alias_all', value: 'Все базы', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		//aspan.create('input',{disabled:true, className: 'alias',type: 'text', id: 'alias_all', name: 'alias_all', value: 'Все базы', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		aspan.create('b',{className: 'titl1',textNode:'Псевдоним для отображения в поисковом интерфейсе'});
		aspan.create('br',{style:{clear:'both'}});
		aspan.create('input',{disabled:true, className: 'ind',type: 'text', id: 'ind_all', name: 'ind_all', value: 'all', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		aspan.create('b',{className: 'titl1',textNode:'ID элемента DOM (для CSS и javaScript)'});
		aspan.create('br',{style:{clear:'both'}});
/*--------------------------*/	
	for(skey in iddb)
	{
		var db=iddb[skey];
		var labskey=db[0][0];
		var dbname=db[0][1];
		var dbtype=db[0][3];
		var dbmode=db[0][4];
		if(dbtype.toUpperCase()=='BIBL')
		{
			var dc=container.create('div',{className:'white'});
			var down=dc.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
			down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var up=dc.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
			up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var downone=dc.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=dc.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var pc=dc.create('p',{style:{width:'80%'},className:dbtype});
			pc.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'База данных: '});
			pc.create('input',{className: 'bases',type: 'checkbox', name: dbmode, value: labskey, title:dbtype, onclick: 'displayType'});
			pc.create('b',{className: 'nam1',textNode:dbname+' (№ '+labskey+')'});
			var aspan=pc.create('span',{className:'block',style: {display: 'none',width:'550px'}});
			aspan.create('input',{className: 'alias',type: 'text', id: 'alias_'+labskey, name: 'alias_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Псевдоним для отображения в поисковом интерфейсе'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{className: 'ind',type: 'text', id: 'ind_'+labskey, name: 'ind_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'ID элемента DOM (для CSS и javaScript)'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'text', id: 'outform_'+labskey, name: 'outform_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Выходная форма (короткий формат)'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'text', id: 'outformfull_'+labskey, name: 'outformfull_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Выходная форма (подробный вывод)'});
			aspan.create('br',{style:{clear:'both'}});
			
/*Дополнительные запросы*/
			var addqueries=aspan.create('div',{id:'addqueries_'+labskey,style: {width:'810px',background:'white'}});
			addqueries.create('b',{className: 'block',textNode:'Дополнительные запросы:',style: {paddingLeft:'5px'}});
			var addqspan=addqueries.create('div',{className:'addqueries',style: {width:'800px',padding:'0'}});
			var minus=addqspan.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var plus=addqspan.create('span',{className: 'plus1',title:'Добавить',onclick: 'addElement'});
			plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var addqspan1=addqspan.create('div',{style: {width:'712px',clear:'none',padding:'5px',border:'solid 1px #ddd',background:'transparent'}});
			addqspan1.create('input',{className: 'addnumber',type: 'text', name: 'addnumber', value: '', style: {margin: ' 0 10px 0 0',border: 'solid 1px #069',width:'50px'}});
			addqspan1.create('span',{textNode:'Номер БД',style:{fontWeight:'normal'}});
			addqspan1.create('input',{className: 'addquery',type: 'text', name: 'addquery', value: '', style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'360px'}});
			addqspan1.create('span',{textNode:'Поисковое выражение',style:{fontWeight:'normal'}});
			addqspan1.create('br');
			addqspan1.create('input',{className: 'addservice',type: 'text', name: 'addservice', value: '', style: {margin: '5px 10px 5px 0',border: 'solid 1px #069',width:'240px'}});
			addqspan1.create('span',{textNode:'Сервис',style:{fontWeight:'normal'}});
			addqspan1.create('input',{className: 'addversion',type: 'text', name: 'addversion', value: '', style: {margin: '5px 10px 5px 10px',border: 'solid 1px #069',width:'50px'}});
			addqspan1.create('span',{textNode:'Версия',style:{fontWeight:'normal'}});
			addqspan1.create('input',{className: 'addoutform',type: 'text', name: 'addoutform', value: '', style: {margin: '5px 10px 5px 10px',border: 'solid 1px #069',width:'100px'}});
			addqspan1.create('span',{textNode:'Выходная форма',style:{fontWeight:'normal'}});
			addqspan1.create('br');
			addqspan1.create('input',{className: 'addport',type: 'text', name: 'addport', value: '', style: {margin: '0 10px 0 0',border: 'solid 1px #069',width:'50px'}});
			addqspan1.create('span',{textNode:'Порт',style:{fontWeight:'normal'}});
			addqspan1.create('input',{className: 'addhost',type: 'text', name: 'addhost', value: '', style: {margin: '0 10px 0 15px',border: 'solid 1px #069',width:'150px'}});
			addqspan1.create('span',{textNode:'Хост',style:{fontWeight:'normal'}});
			addqspan1.create('input',{className: 'addhandlerpath',type: 'text', name: 'addhandlerpath', value: '', style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'245px'}});
			addqspan1.create('span',{textNode:'Обработчик',style:{fontWeight:'normal'}});
/*Дополнительные запросы*/		

			
			aspan.create('input',{type: 'checkbox', id: 'always_'+labskey, name: 'always_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Всегда отображать в интерфейсе'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'checkbox', id: 'loadurl_'+labskey, name: 'loadurl_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Фиксировать статистику открытия документов в свободном доступе'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'checkbox', id: 'seef_'+labskey, name: 'seef_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Иерархический вывод многочастных документов'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'checkbox', id: 'bibcard_'+labskey, name: 'bibcard_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Выводить бибкарточку'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'checkbox', id: 'rusmarc_'+labskey, name: 'rusmarc_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Выводить RUSMARC'});
			aspan.create('br',{style:{clear:'both'}});

			aspan.create('input',{type: 'checkbox', id: 'place_'+labskey, name: 'place_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Отображать местонахождение'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('b',{className: 'titl1',textNode:'ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ',style:{display:'block'}});
			/*aspan.create('input',{type: 'checkbox', id: 'raitings_'+labskey, name: 'raitings_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Выводить рейтинг записи в результатах поиска'});
			aspan.create('br',{style:{clear:'both'}});
			aspan.create('input',{type: 'checkbox', id: 'comments_'+labskey, name: 'comments_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Выводить комментарии к записи в результатах поиска'});
			aspan.create('br',{style:{clear:'both'}});*/
			aspan.create('input',{type: 'checkbox', id: 'social_'+labskey, name: 'social_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Поделиться в соцсетях'});
			aspan.create('br',{style:{clear:'both'}});
			
			
			aspan.create('input',{className: 'brokerid',type: 'text', id: 'brokerid_'+labskey, name: 'brokerid_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'BrokerId'});
			aspan.create('br',{style:{clear:'both'}});
			aspan.create('input',{className: 'fundlogin',type: 'text', id: 'fundlogin_'+labskey, name: 'fundlogin_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Логин'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{className: 'check',type: 'checkbox', id: 'rub_'+labskey, name: 'rub_'+labskey, value: 'rubricator', onclick: 'displayRubricator'});
			var b=aspan.create('b',{className: 'rub',textNode:'Использовать рубрикатор'});
			b.create('br');
			
			b.create('input',{type: 'radio', id: 'rubinside_'+labskey, name: 'rub', value: 'inside'});
			b.create('label',{textNode:'В результатах поиска'});
			
			b.create('input',{type: 'radio', id: 'ruboutside_'+labskey, name: 'rub', value: 'outside'});
			b.create('label',{textNode:'На отдельной странице'});
			
			
			var rubdiv=aspan.create('div',{className:'white',style:{display:'none'}});
			rubdiv.create('input',{className: 'ind',type: 'text', id: 'nam_'+labskey, name: 'nam_'+labskey, value: '', style: {width: '250px', margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			rubdiv.create('b',{className: 'titl1',textNode:'Название в поисковом интерфейсе'});
			var rrspan=rubdiv.create('span',{className:'block'});
			rrspan.create('input',{className: 'ind',type: 'text', id: 'fname_'+labskey, name: 'fname_'+labskey, value: '', style: {width: '215px', margin: '0px', border: 'solid 1px #069'}});
			rrspan.create('span',{textNode:'.xml'});
			rrspan.create('b',{className: 'titl1',textNode:'Имя файла рубрикатора'});
			rrspan.create('br',{style:{clear:'both'}});
			rrspan.create('input',{className: 'ind',type: 'text', id: 'rublabel_'+labskey, name: 'rublabel_'+labskey, value: '', style: {width: '40px', margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			rrspan.create('b',{className: 'titl1',textNode:'Имя метки рубрикатора'});
			rrspan.create('br',{style:{clear:'both'}});
			rubdiv.create('input', {className: 'button', id: 'rubbut_'+labskey, value: 'Загрузить', onclick: 'function(){loadRubricator('+labskey+')}', type: 'button'});
			rubdiv.create('br',{style:{clear:'both'}});

			var basecont=dc.create('div',{className:'white',id:'bc_'+labskey});
			var labscontainer=basecont.create('div',{className:'white',id:'uselab_'+labskey});
			var pl=labscontainer.create('p');
			pl.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Поисковые метки: '});
			var labels=labscontainer.create('div',{className:'labels'});
			var labspan=labels.create('span',{style:{display:'block'}});
			var slspan=labspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
			slspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});

			var limitscontainer=basecont.create('div',{className:'white',id:'uselimit_'+labskey});
			var plim=limitscontainer.create('p');
			plim.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Ограничения: '});
			var limits=limitscontainer.create('div',{className:'limits'});
			var limitspan=limits.create('span',{style:{display:'block'}});
			var lspan=limitspan.create('span',{className:'load',title:'Загрузить',onclick: 'function(){loadLimit('+labskey+',1);}', onmouseover: 'function(){setCursor(this)}'});
			lspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var smspan=limitspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
			smspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var filterscontainer=basecont.create('div',{className:'white',id:'usefilter_'+labskey});
			/*if((solr)||('biblio'))
			{
				filterscontainer.n.style.display="none";
			}
			else
			{
				filterscontainer.n.style.display="";
			}*/
			var pfil=filterscontainer.create('p');
			pfil.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Фильтры: '});
			var filters=filterscontainer.create('div',{className:'filters'});
			var filterspan=filters.create('span',{style:{display:'block'}});
			var fspan=filterspan.create('span',{className:'load',title:'Загрузить',onclick: 'function(){loadLimit('+labskey+',2);}', onmouseover: 'function(){setCursor(this)}'});
			fspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var sfspan=filterspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
			sfspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		}
		else
		{
			var dc=container.create('div',{className:'white'});
			var down=dc.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
			down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var up=dc.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
			up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var downone=dc.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=dc.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});

			var pc=dc.create('p',{style:{width:'80%'},className:dbtype});
			pc.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'База данных: '});
			pc.create('input',{className: 'bases',type: 'checkbox', name: dbmode, value: labskey, title:dbtype, onclick: 'displayType'});
			pc.create('b',{className: 'nam1',textNode:dbname+' (№ '+labskey+')'});
			var aspan=pc.create('span',{className:'block',style: {display: 'none',width:'550px'}});
			aspan.create('input',{className: 'alias',type: 'text', id: 'alias_'+labskey, name: 'alias_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Псевдоним для отображения в поисковом интерфейсе'});
			aspan.create('br',{style:{clear:'both'}});
			aspan.create('input',{className: 'ind',type: 'text', id: 'ind_'+labskey, name: 'ind_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'ID элемента DOM (для CSS и javaScript)'});
			aspan.create('br',{style:{clear:'both'}});
			aspan.create('input',{className: 'brokerid',type: 'text', id: 'brokerid_'+labskey, name: 'brokerid_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'BrokerId'});
			aspan.create('input',{className: 'fundlogin',type: 'text', id: 'fundlogin_'+labskey, name: 'fundlogin_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
			aspan.create('b',{className: 'titl1',textNode:'Логин'});
			aspan.create('br',{style:{clear:'both'}});

			
			aspan.create('b',{className: 'nam1',textNode:'Интерфейс: '});			
			var aspanselect=aspan.create('select',{id: 'afrub_'+labskey, name: 'afrub_'+labskey, className: 'check'});
			aspanselect.create('option',{textNode: 'словарь',value:'af_slovar'});
			aspanselect.create('option',{textNode: 'стандартный',value:'af_standard'});
			aspanselect.create('option',{textNode: 'рубрикатор',value:'af_rubricator'});
			aspanselect.create('option',{textNode: 'иерархический рубрикатор',value:'af_mesh'});
			aspanselect.create('option',{textNode: 'рубрикатор MeSH',value:'tree_view'});
			aspan.create('br',{style:{clear:'both'}});
			
			aspan.create('input',{type: 'checkbox', name: 'display_'+labskey, id: 'display_'+labskey, value: labskey});
			aspan.create('b',{className: 'nam1',textNode:'Не отображать в интерфейсе '});
			aspan.create('br',{style:{clear:'both'}});
			
			
			var basecont=dc.create('div',{className:'white',id:'bc_'+labskey});
			var labscontainer=basecont.create('div',{className:'white',id:'uselab_'+labskey});
			var pl=labscontainer.create('p');
			pl.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Поисковые метки: '});
			var labels=labscontainer.create('div',{className:'labels'});
			var labspan=labels.create('span',{style:{display:'block'}});
			var slspan=labspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
			slspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			if(take('af_int').n.checked!=false)
			{
				dc.show();
			}
			else
			{
				dc.hide();
			}
		}
	}

/*---------блок настройки сайта----------*/
	
	var div2=doc.create('div');
	div2.create('input',{className:'wr',id:'wi3',name:'wi3',type:'checkbox',checked:true});
	div2.create('label',{className: 'wrapped', 'for': 'wi3', textNode: 'Настройка сайта'});
	var container2=div2.create('div',{className:'expl',style:{border:'solid 1px #ddd', background: '#f6f6f6'}});
	var spanreg=container2.create('span');
	spanreg.create('input',{type: 'checkbox', id: 'registration', name: 'registration', value: 'registration', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
	spanreg.create('label',{'for':'registration',textNode:'Регистрация'});
	var divreg=spanreg.create('span', {id:'registrdiv',className: 'expl1',style:{marginLeft:'30px',marginTop:'10px'}});
	var tspan=divreg.create('span',{textNode:'Код и название группы '});
	tspan.create('i',{textNode:'(прописными буквами без пробела)'});
	divreg.create('input',{type:'text',className:'check',name: 'groupcode',id: 'groupcode', value: '',style:{margin:'0px 0px 10px 30px',padding:'0px 0px 0px 5px',height:'20px',width:'350px',border:'solid 1px #069'}});
	divreg.create('br');
	divreg.create('span',{textNode:'Код пункта записи'});
	divreg.create('input',{type:'text',className:'check',name: 'codepointreg',id: 'codepointreg', value: '',style:{margin:'0px 0px 10px 30px',padding:'0px 0px 0px 5px',height:'20px',width:'100px',border:'solid 1px #069'}});
	divreg.create('br');
	var nspan=divreg.create('span',{textNode:'Примечание '});
	nspan.create('i',{textNode:'(например, Internet)'});
	divreg.create('input',{type:'text',className:'check',name: 'notepointreg',id: 'notepointreg', value: '',style:{margin:'0px 0px 0px 30px',padding:'0px 0px 0px 5px',height:'20px',width:'350px',border:'solid 1px #069'}});
	divreg.create('br');
	divreg.create('input',{type: 'checkbox',id: 'payloan', 'name': 'payloan', value: 'payloan',style:{marginTop:'10px'}});
	var tlab=divreg.create('label',{'for':'payloan',textNode: 'платный абонемент ',style:{color:'#333',fontWeight:'normal'}});
	tlab.create('i',{textNode:'(коллективные/индивидуальные абоненты)'});
	
	var spannews=div2.create('div');
	
/*-------конец блок настройки сайта-------*/
	
	var pb=doc.create('p',{style:{textAlign:'center'}});
	pb.create('input',{className: 'button', type:'button',onclick:'function(){nextSettings(4);}',value:'Сохранить'})
	doc.create('br');
}

function showInterface()
{
	take('basesets').hide();
	createInterface();
}

function createInterface()
{
	var doc=take('frm');
	var div=doc.create('div');
	take('invitation').hide();
	div.create('input',{className:'wr',id:'wi1',name:'wi1',type:'checkbox',checked:true});
	div.create('label',{className: 'wrapped', 'for': 'wi1', textNode: 'Настройка поискового интерфейса'});
	var container=div.create('div',{className:'expl'});
	var simple=container.create('div');
	var sspan=simple.create('span', {className: 'floatleft'});
	sspan.create('input',{type: 'checkbox',id: 'simple', 'name': 'simple', value: 'простой поиск', className: 'check',checked:true,disabled:true});
	sspan.create('label',{'for':'simple',textNode: 'ПРОСТОЙ ПОИСК'});
	sspan.create('input',{type: 'hidden',id: 'shotform', 'name': 'shotform', value: 'SHOTFORM'});
	sspan.create('input',{type: 'hidden',id: 'fullform', 'name': 'fullform', value: 'FULLFORM'});
	simple.create('br',{style: {clear: 'both'}});
	var expand=container.create('div');
	var exspan=expand.create('span',{onclick: 'checkFields', className: 'floatleft'});
	exspan.create('input',{type: 'checkbox',id: 'expand', 'name': 'expand', value: 'расширенный поиск', className: 'check'});
	exspan.create('label',{'for':'expand',textNode: 'РАСШИРЕННЫЙ ПОИСК'});
	var exspan1=expand.create('span',{id: 'fieldscontainer', className: 'floatleft',style:{display:'none',margin:'0px',padding:'0px'}});
	exspan1.create('input',{id: 'quantity','name': 'quantity',type: 'text',className: 'check', value: '3', maxLength: '1',style:{margin:'5px 0px 0px 5px',padding:'0px',height:'20px',width:'20px',textAlign:'center',border:'solid 1px #069'}});
	exspan1.create('label',{'for':'quantity',textNode: 'Полей в расширенном поиске'});
	exspan1.create('input',{type: 'checkbox',id: 'tie', 'name': 'tie', value: 'объединять', className: 'check',style:{margin:'5px 0px 0px 10px'}});
	exspan1.create('label',{'for':'tie',textNode: 'ОБЪЕДИНЯТЬ ПОЛЯ И/ИЛИ/НЕ'});
	exspan1.create('br',{style: {clear: 'both'}});
	var profs=container.create('div');
	var pspan=profs.create('span', {onclick: 'checkAfs', className: 'floatleft'});
	pspan.create('input',{type: 'checkbox',id: 'professional', 'name': 'professional', value: 'профессиональный поиск', className: 'check'});
	pspan.create('label',{'for':'professional',textNode: 'ПРОФЕССИОНАЛЬНЫЙ ПОИСК'});
	var pspan1=profs.create('span',{id: 'afscontainer', className: 'floatleft', style:{display:'none'}});
	var ppspan1=pspan1.create('span',{onclick: 'chooseAfs', className: 'floatleft',style:{margin:'0px',padding:'0px'}});
	ppspan1.create('input',{type: 'checkbox',id: 'choose_af', 'name': 'choose_af', value: 'алфавитный список', className: 'check'});
	ppspan1.create('label',{'for':'choose_af',textNode: 'алфавитный список'});
	
	profs.create('br',{style: {clear: 'both'}});
	
	var af=container.create('div');
	var afspan=af.create('span', {className: 'floatleft'});
	afspan.create('input',{type: 'checkbox',id: 'af_int', 'name': 'af_int', value: 'поиск в аф', className: 'check',onclick:'showBases'});
	afspan.create('label',{'for':'af_int',textNode: 'ПОИСК В АФ'});
	var afspan1=af.create('span',{id: 'aflabscontainer', className: 'floatleft',style:{display:'none'}});
	afspan1.create('span',{textNode: 'Имя метки для поиска в BIBL'});
	afspan1.create('input',{type:'text',className:'check',id: 'aflabname', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	afspan1.create('span',{textNode: 'Название метки для поиска в BIBL'});
	afspan1.create('input',{type:'text',className:'check',id: 'aflabalias', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
	
	afspan1.create('span',{textNode: 'Предварительный поиск по всем АФ'});
	afspan1.create('input',{type:'checkbox',id: 'prefind', value: ''});
	
	var pppspan1=af.create('span',{id:'affind', className: 'floatleft',style:{display:'none'}});
	pppspan1.create('span',{textNode:'BrokerId'});
	pppspan1.create('input',{type:'text',className:'check',id: 'affindbroker', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
	pppspan1.create('span',{textNode:'Логин'});
	pppspan1.create('input',{type:'text',className:'check',id: 'affindlogin', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
	
	af.create('br',{style: {clear: 'both'}});
	
	var fnd=container.create('div');
	var fspan=fnd.create('span',{onclick: 'checkDisplay', className: 'floatleft'});
	fspan.create('input',{type: 'checkbox',id: 'fundholders', 'name': 'fundholders', value: 'фондодержатели', className: 'check'});
	fspan.create('label',{'for':'fundholders',textNode: 'ПОИСК ФОНДОДЕРЖАТЕЛЕЙ'});
	var fspan1=fnd.create('span',{id: 'fholderscontainer', className: 'floatleft',style:{display:'none'}});
	fspan1.create('span',{textNode: 'Выбор БД'});
	var fselect=fspan1.create('select',{id: 'switch_in_base', 'name': 'switch_in_base', className: 'check',onchange:'findDispay'});
	fselect.create('option',{textNode: 'в списке баз данных',value:'in_base'});
	fselect.create('option',{textNode: 'в поисковом интерфейсе',value:'in_interface'});
	fselect.create('option',{textNode: 'не отображать в интерфейсе',value:'none'});
	fspan1.create('span',{textNode:'№ БД'});
	fspan1.create('input',{type:'text',className:'check',id: 'fundnumber', value: '', maxLength: '4',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	fspan1.create('span',{textNode:'Псевдоним в интерфейсе'});
	fspan1.create('input',{type:'text',className:'check',id: 'fundalias', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
	fspan1.create('br');
	fspan1.create('span',{textNode:'Имя метки'});
	fspan1.create('input',{type:'text',className:'check',id: 'fundslabel', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	fspan1.create('span',{textNode:'Метка для поиска в библиографии'});
	fspan1.create('input',{type:'text',className:'check',id: 'searchfundslabel', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	fspan1.create('br');
	fspan1.create('span',{textNode:'BrokerId'});
	fspan1.create('input',{type:'text',className:'check',id: 'fundbroker', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
	fspan1.create('span',{textNode:'Логин'});
	fspan1.create('input',{type:'text',className:'check',id: 'fundlogin', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
	fnd.create('br',{style: {clear: 'both'}});
	
	var smap=container.create('div');
	var smapspan=smap.create('span', {className: 'block'});
	smapspan.create('input',{type: 'checkbox',id: 'map_inp', 'name': 'map_inp', value: 'поиск по карте', className: 'check',onclick:'showMapDiv'});
	smapspan.create('label',{'for':'map_inp',textNode: 'ПОИСК ПО КАРТЕ'});
	var smapspan1=smap.create('span',{id: 'mapcontainer', style:{display:'none',margin:'0'}});
	smapspan1.create('input',{type:'text',id: 'smapwidth', value: '',style:{margin:'5px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	smapspan1.create('label',{'for':'smapwidth',textNode: 'Ширина карты'});
	smapspan1.create('input',{type:'text',id: 'smapheight', value: '',style:{margin:'5px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	smapspan1.create('label',{'for':'smapheight',textNode: 'Высота карты'});
	smapspan1.create('input',{'type':'checkbox',id:'listregions','name':'listregions','value':'listregions', style:{margin:'5px'}});
	smapspan1.create('label',{'for':'listregions',textNode: 'Выводить список областей региона при открытии увеличенной карты региона с областями'});
	smapspan1.create('br');
	smapspan1.create('input',{type: 'button',id: 'smaploadbutton', 'name': 'smaploadbutton', value: 'Загрузить координаты (карта России)', className: 'button',onclick:'loadCords',style:{width:'310px',margin:'5px'}});
	smapspan1.create('input',{type: 'button',id: 'smapeditbutton', 'name': 'smapeditbutton', value: 'Добавить/редактировать координаты', className: 'button',onclick:'editCords',style:{width:'310px',style:{margin:'5px'}}});
	
	/*var flt=container.create('div');
	var fltspan=flt.create('span', {className: 'floatleft'});
	fltspan.create('input',{type: 'checkbox',id: 'flt_int', 'name': 'flt_int', value: 'поиск по полному тексту', className: 'check',onclick:'showFl', disabled:true});
	fltspan.create('label',{'for':'flt_int',textNode: 'ПОИСК ПО ПОЛНОМУ ТЕКСТУ'});
	var fltspan1=flt.create('span',{id: 'fltlabscontainer', className: 'floatleft',style:{display:'none'}});
	fltspan1.create('span',{textNode: 'Номер базы данных'});
	fltspan1.create('input',{type:'text',className:'check',id: 'fltlabname', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	flt.create('br',{style: {clear: 'both'}});*/
	
	var ulightdiv=container.create('div');
	var ulightspan=ulightdiv.create('span', {className: 'floatleft'});
	ulightspan.create('input',{type: 'checkbox',id: 'uselight', 'name': 'uselight', value: 'подсветка поискового термина', className: 'check'});
	ulightspan.create('label',{'for':'uselight',textNode: 'ПОДСВЕТКА ПОИСКОВОГО ТЕРМИНА'});
	ulightdiv.create('br',{style: {clear: 'both'}});
	
	var usortdiv=container.create('div');
	var usortspan=usortdiv.create('span', {className: 'floatleft'});
	usortspan.create('input',{type: 'checkbox',id: 'usesort', 'name': 'usesort', value: 'сортировка результатов поиска', className: 'check',onclick:'function(){showFacets(\'usesort\')}'});
	usortspan.create('label',{'for':'usesort',textNode: 'СОРТИРОВКА РЕЗУЛЬТАТОВ ПОИСКА'});
	usortdiv.create('input',{type: 'button',id: 'usesortbutton', 'name': 'bibliobutton', value: 'Список меток для сортировки', className: 'button',onclick:'loadSort',style:{width:'350px',marginLeft:'50px',display:'none'}});
	usortdiv.create('br',{style: {clear: 'both'}});
	
	var ublinddiv=container.create('div');
	var ublindspan=ublinddiv.create('span', {className: 'floatleft'});
	ublindspan.create('input',{type: 'checkbox',id: 'useblind', 'name': 'useblind', value: 'версия для слабовидящих', className: 'check'});
	ublindspan.create('label',{'for':'useblind',textNode: 'ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ'});
	ublinddiv.create('br',{style: {clear: 'both'}});
	
	var bibliodiv=container.create('div');
	var bibliospan=bibliodiv.create('span', {className: 'floatleft'});
	bibliospan.create('input',{type: 'checkbox',id: 'biblio', 'name': 'biblio', value: 'поиск через библиопоиск', className: 'check',onclick:'function(){showFacets(\'biblio\')}'});
	bibliospan.create('label',{'for':'biblio',textNode: 'ПОИСК ЧЕРЕЗ БИБЛИОПОИСК'});
	/*bibliodiv.create('input',{type: 'button',id: 'bibliobutton', 'name': 'bibliobutton', value: 'Редактировать список фасетов', className: 'button',onclick:'loadFacets',style:{width:'350px',marginLeft:'50px',display:'none'}});*/
	bibliodiv.create('br',{style: {clear: 'both'}});
	
	var bibliowidgetdiv=container.create('div');
	var bibliowidgetspan=bibliowidgetdiv.create('span', {className: 'floatleft'});
	bibliowidgetspan.create('input',{type: 'checkbox',id: 'bibliowidget', 'name': 'bibliowidget', value: 'виджет библиопоиска', className: 'check',onclick:'function(){showFacets(\'bibliowidget\')}'});
	bibliowidgetspan.create('label',{'for':'bibliowidget',textNode: 'ВИДЖЕТ БИБЛИОПОИСКА'});
	var bibliowidgetspan1=bibliowidgetspan.create('span',{id: 'bibliowidgetbutton',style:{display:'none'}});
	var bibliowidgetinput=bibliowidgetspan1.create('input',{type:'text',className:'check',id: 'bibliowidgetid', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
	bibliowidgetspan1.create('span',{textNode: 'ID библиотеки'});
	if((typeof biblioapi == "undefined") || ((typeof biblioapi != "undefined")&&(biblioapi == "")))
		bibliowidgetinput.n.disabled=true;
	else
		bibliowidgetinput.n.disabled=false;
	bibliowidgetdiv.create('br',{style: {clear: 'both'}});
	
	var solrdiv=container.create('div');
	var solrspan=solrdiv.create('span', {className: 'floatleft'});
	solrspan.create('input',{type: 'checkbox',id: 'solr', 'name': 'solr', value: 'фасеты solr', className: 'check',onclick:'function(){showFacets(\'solr\')}'});
	solrspan.create('label',{'for':'solr',textNode: 'ФАСЕТЫ SOLR'});
	/*solrdiv.create('input',{type: 'button',id: 'solrbutton', 'name': 'solrbutton', value: 'Редактировать список фасетов', className: 'button',onclick:'loadFacets',style:{width:'350px',marginLeft:'50px',display:'none'}});*/
	solrdiv.create('br',{style: {clear: 'both'}});
	
	container.create('br',{style: {clear: 'both'}});
	var pb=doc.create('p',{style:{textAlign:'center'}});
	pb.create('input',{className: 'button', type:'button',value: 'Продолжить', id: 'chooseaction1', onclick: 'function(){nextSettings(3)}'});
}

function backLoadFacets(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var doc=take('facetwinform');
		doc.n.innerHTML="";
		for(var arg in rezult)
		{
			var value=rezult[arg];
			var span=doc.create('div',{className:'white'});
			var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd'});
			down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin'});
			up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var plus=span.create('span',{className: 'plus1',title:'Добавить перед',onclick: 'addElement'});
			plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			span.create('span',{textNode: 'Роль',style:{color: '#069',fontWeight:'bold',width:'50px'}});
			span.create('input',{type: 'text', name: 'fsrole', value:arg,style:{width:'70px',margin: '0 10px 0 10px', padding: '0',border:'solid 1px #069'}});
			span.create('span',{textNode: 'Имя',style:{color: '#069',fontWeight:'bold',width:'50px'}});
			span.create('input',{type: 'text', name: 'fslabel', value:value.label,style:{width:'50px',margin: '0 10px 0 10px', padding: '0',border:'solid 1px #069'}});
			span.create('span',{textNode: 'Название',style:{color: '#069',fontWeight:'bold',width:'50px'}});
			span.create('input',{type: 'text', name: 'fstitle', value:value.title,style:{minWidth:'350px',width:'40%',margin: '0 10px 0 10px', padding: '0',border:'solid 1px #069'}});
		}
	}
}

function backSaveFacets(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		delLayerWin();
	}
}

function saveFacets()
{
	var arr=take('facetwinform').getsign('div',{className:'white'});
	var obj={};
	for(var i=0; i<arr.length; i++)
	{
		var role=take(arr[i]).getsign('input',{'name':'fsrole'})[0].value;
		var label=take(arr[i]).getsign('input',{'name':'fslabel'})[0].value;
		var title=take(arr[i]).getsign('input',{'name':'fstitle'})[0].value;
		obj[role]={};
		obj[role].title=title;
		obj[role].label=label;
	}
	var gArr=new Array();
	gArr.push(["facetspath",dirhtdocs]);
	gArr.push(["facetjson",JSON.stringify(obj)]);
	ajaxToRCP(gArr,backSaveFacets,'default/php/savefacets.php');
}

function loadFacets()
{
	var gArr=new Array();
	gArr.push(["isfacets","../conf/facets.conf"]);
	var arg={};
	arg.message='РЕДАКТИРОВАТЬ СПИСОК ФАСЕТОВ';
	arg.callback='function(){saveFacets()}';
	arg.width="80%";
	arg.height="80%";
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Заменить';
	scrollobj=take('solr').n;
	showLayerWin('facetwin',arg);
	ajaxToRCP(gArr,backLoadFacets,'default/php/loadfacets.php');
}

function loadSort()
{
	var gArr=new Array();
	gArr.push(["issort","../conf/sort.conf"]);
	var arg={};
	arg.message='СПИСОК МЕТОК ДЛЯ СОРТИРОВКИ';
	arg.callback='function(){saveSort()}';
	arg.width="80%";
	arg.height="80%";
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Заменить';
	scrollobj=take('solr').n;
	showLayerWin('sortwin',arg);
	ajaxToRCP(gArr,backLoadSort,'default/php/loadsort.php');
}

function backLoadSort(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var doc=take('sortwinform');
		doc.n.innerHTML="";
		for(var arg in rezult)
		{
			var value=rezult[arg];
			var span=doc.create('div',{className:'white'});
			var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd'});
			down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin'});
			up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var plus=span.create('span',{className: 'plus1',title:'Добавить перед',onclick: 'addElement'});
			plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			span.create('span',{textNode: 'Имя',style:{color: '#069',fontWeight:'bold',width:'50px'}});
			span.create('input',{type: 'text', name: 'fslabel', value:arg,style:{width:'50px',margin: '0 10px 0 10px', padding: '0',border:'solid 1px #069'}});
			span.create('span',{textNode: 'Название',style:{color: '#069',fontWeight:'bold',width:'50px'}});
			span.create('input',{type: 'text', name: 'fstitle', value:value,style:{minWidth:'350px',width:'40%',margin: '0 10px 0 10px', padding: '0',border:'solid 1px #069'}});
		}
	}
}

function saveSort()
{
	var arr=take('sortwinform').getsign('div',{className:'white'});
	var obj={};
	for(var i=0; i<arr.length; i++)
	{
		var label=take(arr[i]).getsign('input',{'name':'fslabel'})[0].value;
		var title=take(arr[i]).getsign('input',{'name':'fstitle'})[0].value;
		obj[label]=title;
	}
	var gArr=new Array();
	gArr.push(["sortpath",dirhtdocs]);
	gArr.push(["sortjson",JSON.stringify(obj)]);
	ajaxToRCP(gArr,backSaveSort,'default/php/savesort.php');
}

function backSaveSort(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	try
	{
		eval(x.responseText);
	}
	catch(e)
	{
		var error={};
		error._message_0="Не удалось записать данные в файл.";
		error._action_1="";
	}
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		delLayerWin();
	}
}

function backLoadCords(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else if(typeof obj!="undefined")
	{
		scrollobj=null;
		alert(obj._message_0);
		if(obj._action_1.indexOf(foldername)!=-1)
		{
			if(take('mapcontainer').n.lastChild.id!="iscords")
			{
				take('mapcontainer').create('br');
				take('mapcontainer').create('u',{textNode:'Координаты загружены по адресу',style:{margin:'0 0 0 5px'}});
				take('mapcontainer').create('input',{type: 'text',id:'iscords',name:'iscords',value:obj._action_1,disabled:'disabled',style:{width:'auto',minWidth:'500px',border:'none',padding:'5px',margin:'5px'}});
				take('smapwidth').n.value='790';
				take('smapheight').n.value='460';
			}
		}
	}
	else
		alert('Неопределенная ошибка выполнения!');
}

function loadCords()
{
	scrollobj=take('map_inp').n;
	var gArr=new Array();
	gArr.push(["iscords",dirhtdocs]);
	ajaxToRCP(gArr,backLoadCords,'default/php/loadcords.php');
}

function backSaveCords(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else if(typeof obj != "undefined")
	{
		if(obj._action_1.indexOf(foldername)!=-1)
		{
			delLayerWin();
			alert(obj._message_0);
			if(take('mapcontainer').n.lastChild.id!="iscords")
			{
				take('mapcontainer').create('br');
				take('mapcontainer').create('u',{textNode:'Координаты загружены по адресу',style:{margin:'0 0 0 5px'}});
				take('mapcontainer').create('input',{type: 'text',id:'iscords',name:'iscords',value:obj._action_1,disabled:'disabled',style:{width:'auto',minWidth:'500px',border:'none',padding:'5px',margin:'5px'}});
			}
		}
		else
			alert(obj._message_0);
	}
	else
		alert('Неопределенная ошибка выполнения!');
}

function saveCords()
{
	var arr=take('cordswinform').getsign('div',{className:'f6'});
	var obj={};
	for(var i=0; i<arr.length; i++)
	{
		var arrname=take(arr[i]).getsign('input',{className:'arrname'})[0].value;
		obj[arrname]={};
		var arr1=take(arr[i]).getsign('span',{className:'scords'});
		for(var j=0; j<arr1.length; j++)
		{
			var arrkey=take(arr1[j]).getsign('input',{className:'arrkey'})[0].value;
			obj[arrname][arrkey]=[];
			obj[arrname][arrkey][0]=take(arr1[j]).getsign('textarea',{className:'coords'})[0].value;
			obj[arrname][arrkey][1]=take(arr1[j]).getsign('input',{className:'sign'})[0].value;
			obj[arrname][arrkey][2]=take(arr1[j]).getsign('input',{className:'ind'})[0].value;
			obj[arrname][arrkey][3]=take(arr1[j]).getsign('input',{className:'lab'})[0].value;
			obj[arrname][arrkey][4]=take(arr1[j]).getsign('input',{className:'bcolor'})[0].value;
			obj[arrname][arrkey][5]=take(arr1[j]).getsign('input',{className:'scolor'})[0].value;
			obj[arrname][arrkey][6]=take(arr1[j]).getsign('input',{className:'hcolor'})[0].value;
			obj[arrname][arrkey][7]=take(arr1[j]).getsign('input',{className:'overhandler'})[0].value;
			obj[arrname][arrkey][8]=take(arr1[j]).getsign('input',{className:'outhandlelr'})[0].value;
			obj[arrname][arrkey][9]=take(arr1[j]).getsign('select',{className:'clickhandler'})[0].options[take(arr1[j]).getsign('select',{className:'clickhandler'})[0].selectedIndex].value;
			obj[arrname][arrkey][10]=take(arr1[j]).getsign('input',{className:'sortorder'})[0].value;
		}
	}
	//alert(JSON.stringify(obj));
	var gArr=new Array();
	gArr.push(["cordsspath",dirhtdocs]);
	gArr.push(["cordsjson",JSON.stringify(obj)]);
	ajaxToRCP(gArr,backSaveCords,'default/php/savecords.php');
}

function backEditCords(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var doc=take('cordswinform');
		doc.n.innerHTML="";
		var count=0;
		for(var key in rezult)
		{
			var value=rezult[key];
			var span=doc.create('div',{className:'f6'});
			var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd'});
			down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin'});
			up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var plus=span.create('span',{className: 'plus1',title:'Добавить перед',onclick: 'addElement'});
			plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			span.create('span',{textNode:'Массив координат',style:{display:'inline-block',width:'14%',marginLeft:'10px',marginRight:'15px'}});
			span.create('input',{id:'arrname'+count,type: 'text', className: 'arrname', value:key,style:{padding: '3px', margin: '3px',border:'solid 1px #069',width:'14%'}});
			if(count==0)
				take('arrname'+count).n.disabled=true;
			for(var arg in value)
			{
				var cont=span.create('div',{className:'white'});
				var down=cont.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd'});
				down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var up=cont.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin'});
				up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var downone=cont.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne'});
				downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var upone=cont.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne'});
				upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var minus=cont.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
				minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var plus=cont.create('span',{className: 'plus1',title:'Добавить перед',onclick: 'addElement'});
				plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				
				var div=cont.create('span',{className:'scords',style:{display:'inline-block',width:'70%',background:'white',border:'solid 1px #ddd'}});
				
				div.create('span',{textNode:'Ключ массива',style:{display:'inline-block',width:'20%'}});
				div.create('input',{type: 'text', className: 'arrkey', value:arg,style:{padding: '3px', margin: '3px',border:'solid 1px #069',width:'20%'}});
				div.create('br');
				div.create('span',{textNode:'Координаты',className:'floatleft',style:{width:'20%'}});
				div.create('textarea',{className:'coords',value:value[arg][0], textNode:value[arg][0],style:{border: 'solid 1px #069', color: '#333',width:'70%', padding: '3px', margin: '3px'}});
				div.create('br');
				div.create('span',{textNode:'Название региона',style:{width:'20%',display:'inline-block'}});
				div.create('input',{type: 'text', className: 'sign', value:value[arg][1],style:{width:'70%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('br');
				div.create('span',{textNode:'ID массива координат для масштабирования или поисковый термин',style:{width:'50%',display:'inline-block'}});
				div.create('input',{type: 'text', className: 'ind', value:value[arg][2],style:{width:'40%',padding: '3px', margin: '3px',border:'solid 1px #069',top:'-5px'}});
				div.create('br');
				div.create('span',{textNode:'Поисковая метка',style:{display:'inline-block',width:'20%'}});
				div.create('input',{type: 'text', className: 'lab', value:value[arg][3],style:{width:'10%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('span',{textNode:'Цвет области',style:{display:'inline-block',width:'15%',margin:'5px 2% 5px 1%'}});
				div.create('input',{type: 'text', className: 'bcolor', value:value[arg][4],style:{width:'10%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('span',{textNode:'Цвет обводки',style:{display:'inline-block',width:'15%',margin:'5px 1% 5px 2%'}});
				div.create('input',{type: 'text', className: 'scolor', value:value[arg][5],style:{width:'10%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('br');
				div.create('span',{textNode:'Цвет подсветки',style:{display:'inline-block',width:'20%'}});
				div.create('input',{type: 'text', className: 'hcolor', value:value[arg][6],style:{width:'20%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('span',{textNode:'Порядок сортировки',style:{display:'inline-block',width:'20%',margin:'5px 4% 5px 4%'}});
				div.create('input',{type: 'text', className: 'sortorder', value:value[arg][10],style:{width:'20%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('span',{textNode:'Действия',style:{display:'inline-block',width:'99%',borderBottom:'solid 1px #ccc',fontWeight:'bold',paddingBottom:'5px'}});
				div.create('span',{textNode:'при наведении',style:{display:'inline-block',width:'20%',margin:'5px'}});
				div.create('input',{type: 'text', className: 'overhandler', value:value[arg][7],disabled:'disabled',style:{width:'20%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('span',{textNode:'при снятии курсора',style:{display:'inline-block',width:'20%',margin:'5px 4% 5px 4%'}});
				div.create('input',{type: 'text', className: 'outhandlelr', value:value[arg][8],disabled:'disabled',style:{width:'20%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				div.create('span',{textNode:'при нажатии',style:{display:'inline-block',width:'20%',margin:'5px'}});
				var sel=div.create('select',{id:'clickhandler'+count,className: 'clickhandler',style:{width:'71%',padding: '3px', margin: '3px',border:'solid 1px #069'}});
				sel.create('option',{value:'zoomRegion',textNode:'открыть увеличенный регион с областями'});
				sel.create('option',{value:'searchMap',textNode:'искать по поисковой метке'});
				for(var i=0; i<2;i++)
				{
					if(take('clickhandler'+count).n.options[i].value==value[arg][9])
						take('clickhandler'+count).n.options[i].selected=true;
				}
			}
			count++;
		}
	}
}

function editCords()
{
	var gArr=new Array();
	gArr.push(["iscords",dirhtdocs]);
	var arg={};
	arg.message='РЕДАКТИРОВАТЬ КООРДИНАТЫ';
	arg.callback='function(){saveCords()}';
	arg.width="90%";
	arg.height="90%";
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Заменить';
	scrollobj=take('map_inp').n;
	showLayerWin('cordswin',arg);
	ajaxToRCP(gArr,backEditCords,'default/php/editcords.php');
}

function loadLimit(num,c)
{
	var ext="limits";
	if(c==2)
		ext="filters";
	var gArr=new Array();
	gArr.push(["islimits","../conf/"+ext+".conf"]);
	gArr.push(["dbname",num]);
	gArr.push(["dbindex",c]);
	ajaxToRCP(gArr,backLoadLimits,'default/php/load.php');
}

function editLimit()
{
	var obj=this.parentNode.parentNode;
	var ind=this.parentNode.id;
	var labskey=obj.parentNode.parentNode.id.substring(obj.parentNode.parentNode.id.indexOf('_')+1);
	var text='';
	var arg={};
	var callbackfunction='';
	if(obj.className.toLowerCase()=='limits')
	{
		arg.message='РЕДАКТИРОВАТЬ ОГРАНИЧЕНИЕ';
		arg.callback='function(){putLimit("'+ind+'",'+labskey+',1)}';
		callbackfunction='formLimits1("'+ind+'",'+labskey+')';
	}
	else
	{
		arg.message='РЕДАКТИРОВАТЬ ФИЛЬТР';
		arg.callback='function(){putFilter("'+ind+'",'+labskey+',2)}';
		callbackfunction='formFilters1("'+ind+'",'+labskey+')';
	}
	arg.width='750';
	arg.height='400';
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Заменить';
	scrollobj=take(ind).n;
	showLayerWin('sendwin',arg);
	eval(callbackfunction);
}

function formLimits1(o,l)
{
	var lnode=take(o).n.lastChild;
	var pnode=lnode.previousSibling;
	var doc=take('sendwinform');
	doc.n.innerHTML="";
	var div=doc.create('div',{id:'limits_1'});
	div.create('span',{className: 'floatleft',textNode: 'Название ограничения', style:{color: '#069',fontWeight:'bold',width:'200px'}});
	div.create('input',{type: 'text', name:'limittitle_1', id:'limittitle_1', value: pnode.innerHTML, style:{width: '490px', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
	var span=div.create('span',{className: 'block', style:{width:'50%'}});
	span.create('input',{onclick: 'function(){showHandParameters("hand_1")}', type: 'radio',value: 'hand', name: 'takefrom_1', id: 'hand_1'});
	span.create('label',{'for': 'hand_1',textNode: 'Ручной ввод', style: {marginRight: '5px'}});
	span.create('input',{onclick: 'function(){showFixParameters("fix_1")}', type: 'radio',value: 'fix', name: 'takefrom_1', id: 'fix_1'});
	span.create('label',{'for': 'fix_1',textNode: 'Фиксированное значение'});
	var hinner=div.create('div',{id:'hand_div', className: 'white', style:{display:'none',padding:'0px'}});
	var hand=hinner.create('div',{id:'hand_div_1', className: 'white', style:{padding:'0px',border:'none'}});
	hand.create('input', {className: 'button', id: 'labbut_1', value: 'Метка', onclick: 'function(){chooseLabel(1,'+l+')}', type: 'button'});
	hand.create('input',{onclick: 'function(){checkHand("one_1")}', type: 'radio',value: 'one', name: 'inputtype_1', id: 'one_1'});
	hand.create('label',{'for': 'one_1',textNode: 'Текстовое поле', style: {marginRight: '5px'}});
	hand.create('input',{onclick: 'function(){checkHand("period_1")}', type: 'radio',value: 'period', name: 'inputtype_1', id: 'period_1'});
	hand.create('label',{'for': 'period_1',textNode: 'Период (для типа DATE)'});
	var finner=div.create('div',{id:'fix_div', className: 'white', style:{display:'none',padding:'0px'}});
	var fix=finner.create('div',{id:'fix_div_1', className: 'white', style:{padding:'0px',border:'none'}});
	fix.create('input', {className: 'button', id: 'addbut_1', value: 'Добавить', onclick: 'function(){limitsConstructor("ОГРАНИЧЕНИЙ",1,'+l+')}', type: 'button'});
	if(lnode.nodeName.toLowerCase()=='select')
	{
		var len=lnode.options.length;
		for(var i=0; i<len; i++)
		{
			var fdiv=finner.create('div',{id:'fix_div_'+(i+2), className: 'white',style:{padding:'0px',border:'none'}});
			var fwhite=fdiv.create('div',{style:{width:'600px',margin:'0px',padding:'0px'},className:'floatleft'});
			fwhite.create('span',{textNode:lnode.options[i].value,className:'floatleft',style:{width:'345px',overflow:'hidden'}});
			fwhite.create('input',{className:lnode.className,value:lnode.options[i].text,style:{width:'225px',margin: '0 0 0 10px', padding: '0',border:'solid 1px #069'}});
			var downone=fdiv.create('span',{className: 'downone',title:'Вниз',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=fdiv.create('span',{className: 'upone',title:'Вверх',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var minus=fdiv.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			fdiv.create('div',{className:'spacer'});
		}
		take('fix_1').n.checked=true;
		take('hand_1').n.checked=false;
		finner.show();
		hinner.hide();
	}
	else
	{
		take('hand_1').n.checked=true;
		take('fix_1').n.checked=false;
		hinner.show();
		finner.hide();
	}
}

function formFilters1(o,l)
{
	var lnode=take(o).n.lastChild.previousSibling;
	var pnode=lnode.previousSibling;
	if(pnode.innerHTML.indexOf('img')!=-1)
		pnode=lnode;
	var doc=take('sendwinform');
	doc.n.innerHTML="";
	var div=doc.create('div',{id:'filters_1'});
	div.create('span',{className: 'floatleft',textNode: 'Название фильтра', style:{color: '#069',fontWeight:'bold',width:'200px'}});
	div.create('input',{type: 'text', name:'ftitle_1', id:'ftitle_1', value: pnode.innerHTML, style:{width: '490px', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
	div.create('div',{className:'spacer'});
	div.create('input',{onclick: 'function(){checkFilter("fd_1")}', type: 'radio',value: 'fd', name: 'ftype_1', id: 'fd_1'});
	div.create('label',{'for': 'fd_1',textNode: 'Динамическое значение', style: {marginRight: '5px'}});
	div.create('input',{onclick: 'function(){checkFilter("ff_1")}', type: 'radio',value: 'ff', name: 'ftype_1', id: 'ff_1'});
	div.create('label',{'for': 'ff_1',textNode: 'Фиксированное значение'});
	var hand=div.create('div',{id:'f_div_1', className: 'white',style:{display:'none'}});
	hand.create('input', {className: 'button', id: 'fbut_1', value: 'Метка', onclick: 'function(){chooseFilter(1,'+l+')}', type: 'button'});
	var fixinner=div.create('div',{id:'fix_div', className: 'white',style:{display:'none',padding:'0px'}});
	var fixdiv=fixinner.create('div',{id:'fix_div_1', className: 'white',style:{padding:'0px',border:'none'}});
	var add=fixdiv.create('input', {className: 'button', id: 'addbut_1', value: 'Добавить', onclick: 'function(){limitsConstructor("ФИЛЬТРОВ",1,'+l+')}', type: 'button'});
	if(lnode.nodeName.toLowerCase()=='select')
	{
		var len=lnode.options.length;
		for(var i=0; i<len; i++)
		{
			var fdiv=fixinner.create('div',{id:'fix_div_'+(i+2), className: 'white',style:{padding:'0px',border:'none'}});
			var fwhite=fdiv.create('div',{style:{width:'600px',margin:'0px',padding:'0px'},className:'floatleft'});
			fwhite.create('span',{textNode:lnode.options[i].value,className:'floatleft',style:{width:'345px',overflow:'hidden'}});
			fwhite.create('input',{className:lnode.className,value:lnode.options[i].text,style:{width:'225px',margin: '0 0 0 10px', padding: '0',border:'solid 1px #069'}});
			var downone=fdiv.create('span',{className: 'downone',title:'Вниз',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=fdiv.create('span',{className: 'upone',title:'Вверх',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var minus=fdiv.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			fdiv.create('div',{className:'spacer'});
		}
		take('ff_1').n.checked=true;
		take('fd_1').n.checked=false;
		fixinner.show();
		hand.hide();
	}
	else
	{
		take('fd_1').n.checked=true;
		take('ff_1').n.checked=false;
		hand.show();
		fixinner.hide();
	}
}

function backLoadLimits(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		var doc=take('bc_'+dbname);
		var div=take(doc.n.childNodes[dbindex].lastChild);
		var cls='limitname';
		if(dbindex==2)
			cls='filtername';
		var count=0;
		var len=div.getsign('div',{className: 'white'}).length;
		for(var arg in rezult)
		{
			var value=rezult[arg];
			var span=div.create('div',{className:'white',id:'lim'+'_'+dbname+'_'+dbindex+'_'+len+count});
			var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
			down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
			up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
			downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
			upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
			minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			var edit=span.create('span',{className: 'edit1',title:'Редактировать',onclick: 'editLimit', onmouseover: 'function(){setCursor(this)}'});
			edit.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
			span.create('span',{textNode: value[0][0],style:{color: '#069',fontWeight:'bold',width:'200px'}});
			if(value[0][1]=='select')
			{
				var sel=span.create('select',{className:arg,name: cls,style:{width:'350px'}});
				for(var i=0;i<value[1].length; i++)
				{
					sel.create('option',{value: value[1][i][0],textNode: value[1][i][1]});
				}
				if(dbindex==2)
				{
					var elsespan=span.create('span',{style:{display:'block'}});
					elsespan.create('input',{type: 'checkbox', name: 'putelse', value: '', checked:true});
					elsespan.create('span',{textNode:'добавить кнопку "еще..."'});
				}
			}
			else
			{
				span.create('input',{type: 'hidden', name: arg, value:value[1][1]});
			}
			count++;
		}
	}
}

function addLabel()
{
	var obj=this.parentNode.parentNode;
	var labskey=obj.parentNode.parentNode.id.substring(obj.parentNode.parentNode.id.indexOf('_')+1);
	var text='';
	var arg={};
	var callbackfunction='';
	if(obj.className.toLowerCase()=='labels')
	{
		arg.message='ДОСТУПНЫЕ МЕТКИ';
		arg.callback='function(){putLabel("'+labskey+'",0)}';
		//arg.divframe='1';
		callbackfunction='formLabels("'+labskey+'")';
	}
	else if(obj.className.toLowerCase()=='limits')
	{
		arg.message='ДОСТУПНЫЕ ОГРАНИЧЕНИЯ';
		arg.callback='function(){putLimit(null,"'+labskey+'",1)}';
		callbackfunction='formLimits("'+labskey+'")';
	}
	else
	{
		arg.message='ДОСТУПНЫЕ ФИЛЬТРЫ';
		arg.callback='function(){putFilter(null,"'+labskey+'",2)}';
		callbackfunction='formFilters("'+labskey+'")';
	}
	arg.width='750';
	arg.height='400';
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Добавить';
	scrollobj=take('alias_'+labskey).n;
	showLayerWin('sendwin',arg);
	eval(callbackfunction);
}

function formLabels(l)
{
	var div=take('sendwinform');
	div.n.innerHTML="";
	var uarr=take('uselab_'+l).getsign('span',{className:'floatleft'});
	var iarr=[];
	for(var i=0; i<uarr.length; i++)
	{
		iarr[uarr[i].innerHTML]=[];
	}
	var arr=iddb[l][2];
	for(var i=0; i<arr.length; i++)
	{
		var arrlab=arr[i].split('#');
		var labval=arrlab[1];
		var labvoc=arrlab[2];
		var labaf=arrlab[3];
		var labname=arrlab[0];
		var labtitle=arrlab[8];
		if(labval=='Y')
		{
			var span=div.create('div',{style:{overflow:'hidden'}});
			var inp=span.create('input',{type: 'checkbox', name: labname, value: labvoc, className: labaf, title:labtitle});
			if(typeof iarr[labname] != "undefined")
				inp.n.disabled=true;
			span.create('span',{textNode: labname,style:{color: '#069',fontWeight:'bold'}});
			span.create('span',{textNode: labtitle, style: {color: '#333'}});
		}
	}
	/*var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_html","error"]);
	querylist.push(["_service","STORAGE:opacsettingd:Iddb"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["userId",userLogin]);
	querylist.push(["mode","IDDBEDIT"]);
	querylist.push(["iddbNumber",l]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openLabelsWin);*/
}

/*function openLabelsWin(x)
{
	var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		//var div=take('sendwinform');
		//div.n.innerHTML="";
		if(typeof response[0]._labelDefinition_1!="undefined")
		{
			;
		}
	}
}*/

function showHandParameters(num)
{
	var obj=take(num).n;
	obj.checked=true;
	take('fix_1').n.checked=false;
	take('fix_div').hide();
	take('hand_div').show();
}

function showFixParameters(num)
{
	var obj=take(num).n;
	obj.checked=true;
	take('hand_1').n.checked=false;
	take('hand_div').hide();
	take('fix_div').show();
}

function checkHand(num)
{
	var obj=take(num).n;
	var ind=num.substring(num.indexOf('_')+1);
	obj.checked=true;
	if(num.indexOf('one')!=-1)
		take('period_'+ind).n.checked=false;
	else
		take('one_'+ind).n.checked=false;
}

function checkFilter(num)
{
	var obj=take(num).n;
	obj.checked=true;
	if(num.indexOf('fd')!=-1)
	{
		take('ff_1').n.checked=false;
		take('fix_div').hide();
		take('f_div_1').show();
	}
	else
	{
		take('fd_1').n.checked=false;
		take('fix_div').show();
		take('f_div_1').hide();
	}
}

function putTerms(o)
{
	var doc=take('menu1');
	switch(o.checked)
	{
		case true:	doc.create('code', {textNode: replaceSymb(o.nextSibling.innerHTML), id: '_'+o.id});
					if(doc.n.childNodes.length>1)
						doc.show();
		break;
		case false:	doc.n.removeChild(take('_'+o.id).n);
					if(doc.n.childNodes.length<2)
						doc.hide();
		break;
		default: break;
	}
}

function prepareIndxTerms()
{
	var arr=take('menu1').tags('code');
	var str="";
	for(var i=0; i<arr.length; i++)
	{
		str+=arr[i].id+'[end]'+replaceSymb(arr[i].innerHTML);
		if(i<arr.length-1)
			str+='[END]';
	}
	return str;
}

function openIndex(l,item,label,sign)
{
	numDB=l;
	var query="";
	var start=vocstart;
	if(item!=null)
	{
		skipfirst="";
		voclab=take('labelselect').n.options[take('labelselect').n.selectedIndex].id;
		endvoc="";
		vocstart=1;
		firstterm="";
		indxterms="";
		andor=0;
		lastterm="";
		vstr=take('labelselect').n.options[take('labelselect').n.selectedIndex].text;
		vvstr="";
		query=vvstr=firstterm=take('vocval').n.value;
	}
	else
	{
		indxterms=prepareIndxTerms();
		andor=take('andor').n.selectedIndex;
		start=parseInt(vocstart,10);
		if(sign==0)
		{
			start=start-15;
			if(start==1)
			{
				skipfirst="";
				if(vvstr!="")
					query=vvstr;
				firstterm="";
			}
			else
			{
				var arr=firstterm.split('[END]');
				arr.pop();
				var newstr=arr[arr.length-1];
				firstterm=arr.join('[END]');
				query=skipfirst=newstr;
			}
		}
		else
		{
			start=start+15;
			query=skipfirst=lastterm;
			firstterm=firstterm+'[END]'+query;
		}
	}
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	querylist.push(["_service","STORAGE:opacfindd:IndexView"]);
	querylist.push(["_version","1.2.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["userId",identif]);
	querylist.push(["$label",voclab]);
	querylist.push(["label",voclab]);
	querylist.push(["$start",start]);
	querylist.push(["$length",15]);
	querylist.push(["length",15]);
	querylist.push(["iddb",numDB]);
	querylist.push(["$andor",andor]);
	querylist.push(["query",query]);
	querylist.push(["$vstr",vstr]);	
	querylist.push(["$vvstr",vvstr]);	
	querylist.push(["$firstterm",firstterm]);
	if((sign!=null)&&(skipfirst))
	{
		querylist.push(["$skipFirst","true"]);
		querylist.push(["skipFirst","true"]);
	}
	if(indxterms!="")
		querylist.push(["$indxterms",indxterms]);
	//querylist.push(["level[0]","Full"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,openIndexWin);
}

function wwPages()
{
	var pages='';
	if(skipfirst)
		pages+='<span class="for" onmouseover="setCursor(this)" onmousedown="openIndex('+numDB+',null,\''+voclab+'\',0);">«&#160;Назад</span>';
	if(!endvoc)
		pages+='<span class="for" onmouseover="setCursor(this)" onmousedown="openIndex('+numDB+',null,\''+voclab+'\',1);">Далее&#160;»</span>';
	return pages;
}

function openIndexWin(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		WriteError(error);
	}
	else
	{
		if(take('vocwinform').n!=null)
			delLayerWin();
		var arg={};
		arg.message='СЛОВАРЬ';
		arg.callback='putFromVoc';
		arg.target=self;
		arg.callbackname='Добавить';
		showLayerWin('vocwin',arg);
		var doc=take('vocwinform');
		doc.n.innerHTML="";
		if(response[0]._indx_0!=null)
		{
			if(typeof _str!="undefined")
				vvstr=_str;
			if(typeof _skipFirst!="undefined")
				skipfirst=_skipFirst;
			if(typeof _firstterm!="undefined")
				firstterm=_firstterm;
			if(response[0]._end!=null)
				endvoc=true;
			else
				endvoc=false;
			voclab=_label;
			vstr=_vstr;
			vocstart=parseInt(_start);
			var tabbeg='<table class="stab" cellspacing="0" cellpadding="0">';
			tabbeg+='<tr><td colspan="4" class="sh">'+vstr+'</td></tr>';
			var tabend='</table>';
			var str='';
			var i=-1;
			var pages=wwPages();
			if(pages!='')
				pages='<p class="pages">'+pages+'</p>';
			var menu='<div id="scont">'+pages+'<p class="pages"> </p></div>';
			doc.n.innerHTML=menu;
			var scont=take('scont');
			var menu1=scont.create('div',{id:'menu1',style:{display:'none'}});
			var p=menu1.create('p',{className: 'pages'});
			p.create('span',{className:'for',textNode:'Вы отметили: '});
			var asel=p.create('select',{id:'andor',name:'andor'});
			asel.create('option',{value:' OR ', textNode: ' ИЛИ '});
			asel.create('option',{value:' AND ', textNode: ' И '});
			p.create('br');
			if(typeof _indxterms!="undefined")
			{
				indxterms=_indxterms;
				var arr=indxterms.split('[END]');
				for(var j=0; j < arr.length; j++)
				{
					if(arr[j]!="")
						menu1.create('code',{textNode: replaceSymb(arr[j].substring(arr[j].indexOf('[end]')+5)).replace(/&quot;/g,'"'),id: arr[j].substring(0,arr[j].indexOf('[end]'))});
				}
			}
			if(typeof _andor!="undefined")
			{
				andor=parseInt(_andor);
				var sel=document.createAttribute('selected');
				sel.value=true;
				if(take('andor').n!=null)
					take('andor').n.options[_andor].setAttributeNode(sel);
			}
			for (key in response[0])
			{
				var value = response[0][key];
				if(key.indexOf('indx_')!=-1)
				{
					i++;
					var flag="";
					if(menu1.n.childNodes.length>1)
					{
						var childs=menu1.n.childNodes;
						for(var j=0; j<childs.length; j++)
						{
							if(childs[j].id=='_'+(vocstart+i))
							{
								flag='checked="true"';
								break;
							}
						}
					}
					if((i % 2)==0)
						str+='<tr>';
					else
						str+='<tr class="sh">';
					var term=value._item.replace(/&quot;/g,'"');
					str+='<td width="3%">'+(vocstart+i)+'.</td><td width="3%" ><input id="'+(vocstart+i)+'" type="checkbox" '+flag+' class="addbox" name="'+_label+'"  value="'+term+'" onclick="putTerms(this)"/><span style="display: none">'+term+'</span></td><td>'+term+'</td><td width="3%">'+ value._size+'</td></tr>';
					lastterm=_lastterm=term;
				}
			}
			doc.n.innerHTML+=tabbeg+str+tabend;
			if(take('menu1').n.childNodes.length>1)
				take('menu1').show();
		}
		else
		{
			doc.create('p',{textNode: 'Словарные рубрики не найдены.'});
		}
	}
}

function putFromVoc()
{
	var doc=take('vocval').n;
	doc.value="";
	//doc.className=vocval;
	doc.className=voclab;
	var codes=take('menu1').tags('code');
	var andor=take('andor').n.options[take('andor').n.selectedIndex].value;
	for(var i=0; i<codes.length; i++)
	{
		doc.value+=voclab+" '"+codes[i].innerHTML+"'";
		if(i<codes.length-1)
			doc.value+=andor;
	}
	delLayerWin();
}

function moveToBox(l)
{
	var doc=take('box').n;
	var val=take('vocval').n.value;
	if(doc.value.length==0)
		doc.value="("+val+")";
	else
		doc.value+=l+"("+val+")";
	take('vocval').n.value="";
}

function showVoc()
{
	take('vocbutton').hide();
	take('handbook').hide();
	var ind=take('labelselect').n.options[take('labelselect').n.selectedIndex].id;
	var obj=take(ind).n;
	var voc=obj.value;
	if(voc=='Y')
		take('vocbutton').show();
	if((ind=='LL')||(ind=='TG')||(ind=='RT')||(ind=='SF')||(ind=='DV'))
		take('handbook').show();
}

function limitsConstructor(titl,num,l)
{
	var arg={};
	var callbackfunction='';
	arg.message='КОНСТРУКТОР '+titl;
	arg.width='750';
	arg.height='400';
	arg.callback='function(){placeLimit("'+titl+'",'+num+','+l+')}';
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Добавить';
	scrollobj=take('sendwinform').n;
	showLayerWin('limitswin',arg);
	var doc=take('limitswinform');
	doc.n.innerHTML="";
	var arr=iddb[l][2];
	var span=doc.create('span',{className: 'block'});
	var sel=span.create('select',{style:{width:'350px', marginLeft: '10px'},id:'labelselect', onchange: 'showVoc'});
	for(var i=0; i<arr.length; i++)
	{
		var arrlab=arr[i].split('#');
		var labval=arrlab[1];
		var labvoc=arrlab[2];
		var labaf=arrlab[3];
		var labname=arrlab[0];
		var labtitle=arrlab[8];
		if(labval=='Y')
		{
			sel.create('option',{id: labname, value: labvoc, className: labaf, textNode:labname+'  '+labtitle});
		}
	}
	span.create('input',{value: '', id:'vocval',name:'vocval',type:'text',style:{width:'350px',margin: '0 0 0 10px', padding: '0',border:'solid 1px #069'}});
	var span1=doc.create('div',{style:{textAlign:'center',border:'none',background:'#fff'}});
	span1.create('input',{id:'vocbutton',type:'button',className:'button',value:'Словарь', onclick:'function(){openIndex('+l+',"vocval")}',style:{display:'none',marginLeft:'10px'}})
	span1.create('input',{id:'handbook',type:'button',className:'button',value:'Справочник', onclick:'openHandbook',style:{display:'none'}})
	var span2=doc.create('div',{style:{textAlign:'center',border:'none',background:'#fff'}});
	span2.create('input',{id:'AND',type:'button',className:'button1',value:'И',onclick:'function(){moveToBox(" AND ")}'});
	span2.create('input',{id:'OR',type:'button',className:'button1',value:'ИЛИ',onclick:'function(){moveToBox(" OR ")}'});
	span2.create('input',{id:'NOT',type:'button',className:'button1',value:'НЕ',onclick:'function(){moveToBox(" NOT ")}'});
	doc.create('textarea',{id:'box',style:{width:'715px',height: '150px',border: 'solid 1px #069',marginLeft:'10px'},value:''});
}

function placeLimit(titl,num,l)
{
	var doc=take('fix_div_'+num);
	var par=doc.n.parentNode;
	var but=take('addbut_'+num);
	var box=take('box');
	var count=parseInt(num,10)+1;
	if(box.n.value.length>0)
	{
		var lab=take('labelselect').n.options[take('labelselect').n.selectedIndex].id;
		var span=doc.create('div',{style:{width:'600px',margin:'0px',padding:'0px'},className:'floatleft'});
		span.create('span',{textNode:box.n.value,className:'floatleft',style:{width:'345px',overflow:'hidden'}});
		span.create('input',{className:lab,value:'',style:{width:'225px',margin: '0 0 0 10px', padding: '0',border:'solid 1px #069'}});
		var downone=doc.create('span',{className: 'downone',title:'Вниз',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
		downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		var upone=doc.create('span',{className: 'upone',title:'Вверх',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
		upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		var minus=doc.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
		minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		doc.create('div',{className:'spacer'});
		doc.n.removeChild(but.n);
		var fix=take(par).create('div',{id:'fix_div_'+count, className: 'white',style:{padding:'0px',border:'none'}});
		var add=fix.create('input', {className: 'button', id: 'addbut_'+count, value: 'Добавить', onclick: 'function(){limitsConstructor("'+titl+'",'+count+','+l+')}', type: 'button'});
		par.insertBefore(fix.n,doc.n);
	}
	delLayerWin();
}

function placeLabel(num)
{
	var doc=take('hand_div_'+num);
	var span=doc.create('span');
	var lab=take('labelswinform').getsign('input',{checked:true})[0];
	span.create('b',{textNode:lab.id,className:lab.id});
	span.create('span',{textNode:' ('+lab.title+')'});
	doc.n.replaceChild(span.n,doc.n.firstChild);
	delLayerWin();
}

function placeFilter(num)
{
	var doc=take('f_div_'+num);
	var span=doc.create('span');
	var lab=take('labelswinform').getsign('input',{checked:true})[0];
	span.create('b',{textNode:lab.id,className:lab.id});
	span.create('span',{textNode:' ('+lab.title+')'});
	doc.n.replaceChild(span.n,doc.n.firstChild);
	delLayerWin();
}

function checkRadioLab()
{
	var arr=take('labelswinform').getsign('input',{type: 'radio'});
	for(var i=0; i<arr.length; i++)
	{
		arr[i].checked=false;
	}
	this.checked=true;
}

function openHandbook()
{
	var ind=take('labelselect').n.options[take('labelselect').n.selectedIndex].id;
	var gArr=new Array();
	var querylist=new Array();
	gArr.push(["_action","execute"]);
	gArr.push(["_html","stat"]);
	gArr.push(["_errorhtml","error"]);
	gArr.push(["_ctype","text/xml; charset=utf-8"]);
	querylist.push(["_service","STORAGE:opacsettingd:HandbookView"]);
	querylist.push(["_version","1.0.0"]);
	querylist.push(["session",numsean]);
	querylist.push(["userId",identif]);
	querylist.push(["format","RUSMARC"]);
	querylist.push(["type","BIBL"]);
	querylist.push(["name[0]",limitlab[ind]]);
	querylist.push(["_xmlstring","handbook"]);
	gArr.push(["querylist",prepareQueryString(querylist)]);
	ajaxToRCP(gArr,backOpenHandbook);
}

function backOpenHandbook(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	var xml = x.responseXML;
	var xmlDoc=xml.documentElement;
	if(xmlDoc==null)
	{
		eval(x.responseText);
		if(typeof error!="undefined")
			WriteError(error);
	}
	else
	{
		var root=getcNode(xmlDoc);
		var arg={};
		arg.message='СПРАВОЧНЫЙ ФАЙЛ '+root.getAttribute('name')+' - '+root.getAttribute('title');
		arg.width='750';
		arg.height='400';
		arg.target=self;
		showLayerWin('handwin',arg);
		var doc=take('handwinform');
		doc.n.innerHTML="";
		var table=doc.create('table',{className: 'stab1', cellSpacing: '0', cellPadding: '0'});
		var tab=table.create('tbody');
		var trr=tab.create('tr');
		trr.create('td',{textNode:'Имя', style:{width: '15%'},className: 'sh'});
		trr.create('td',{textNode:'Описание',className: 'sh'});
		if(root.hasChildNodes())
		{
			var kids=root.childNodes;
			var count=0;
			for(var i=0; i<kids.length; i++)
			{
				if(kids[i].nodeType==1)
				{
					var cls="";
					if((count % 2)==0)
						cls="norm";
					else
						cls="sh";
					var tr=tab.create('tr',{className:cls});
					tr.create('td',{textNode:kids[i].getAttribute('value'), style:{width: '15%'},className: 'b'});
					tr.create('td',{textNode:kids[i].getAttribute('title')});
					count++;
				}
			}
		}
	}
}

function chooseLabel(num,l)
{
	var arg={};
	var callbackfunction='';
	arg.message='ВЫБОР МЕТКИ';
	arg.width='750';
	arg.height='400';
	arg.callback='function(){placeLabel('+num+')}';
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Добавить';
	scrollobj=take('sendwinform').n;
	showLayerWin('labelswin',arg);
	var arr=iddb[l][2];
	var div=take('labelswinform');
	div.n.innerHTML="";
	for(var i=0; i<arr.length; i++)
	{
		var arrlab=arr[i].split('#');
		var labval=arrlab[1];
		var labvoc=arrlab[2];
		var labaf=arrlab[3];
		var labname=arrlab[0];
		var labtitle=arrlab[8];
		if(labval=='Y')
		{
			var span=div.create('div',{style:{overflow:'hidden'}});
			span.create('input',{onclick:'checkRadioLab',type: 'radio', id: labname, name: 'limitlabel', value: labvoc, className: labaf, title:labtitle});
			span.create('span',{textNode: labname,style:{color: '#069',fontWeight:'bold'}});
			span.create('span',{textNode: labtitle, style: {color: '#333'}});
		}
	}

}

function chooseFilter(num,l)
{
	var arg={};
	var callbackfunction='';
	arg.message='ВЫБОР ФИЛЬТРА';
	arg.width='750';
	arg.height='400';
	arg.callback='function(){placeFilter('+num+')}';
	arg.target=self;
	arg.closename='Закрыть';
	arg.callbackname='Добавить';
	scrollobj=take('sendwinform').n;
	showLayerWin('labelswin',arg);
	var arr=iddb[l][2];
	var div=take('labelswinform');
	div.n.innerHTML="";
	for(var i=0; i<arr.length; i++)
	{
		var arrlab=arr[i].split('#');
		var labval=arrlab[1];
		var labvoc=arrlab[2];
		var labaf=arrlab[3];
		var labname=arrlab[0];
		var labtitle=arrlab[8];
		if(labval=='Y')
		{
			var span=div.create('div',{style:{overflow:'hidden'}});
			span.create('input',{onclick:'checkRadioLab',type: 'radio', id: labname, name: 'limitlabel', value: labvoc, className: labaf, title:labtitle});
			span.create('span',{textNode: labname,style:{color: '#069',fontWeight:'bold'}});
			span.create('span',{textNode: labtitle, style: {color: '#333'}});
		}
	}

}

function formFilters(l)
{
	var doc=take('sendwinform');
	doc.n.innerHTML="";
	var div=doc.create('div',{id:'filters_1'});
	div.create('span',{className: 'floatleft',textNode: 'Название фильтра', style:{color: '#069',fontWeight:'bold',width:'200px'}});
	div.create('input',{type: 'text', name:'ftitle_1', id:'ftitle_1', value: '', style:{width: '490px', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
	div.create('div',{className:'spacer'});
	div.create('input',{onclick: 'function(){checkFilter("fd_1")}', type: 'radio',value: 'fd', name: 'ftype_1', id: 'fd_1'});
	div.create('label',{'for': 'fd_1',textNode: 'Динамическое значение', style: {marginRight: '5px'}});
	div.create('input',{onclick: 'function(){checkFilter("ff_1")}', type: 'radio',value: 'ff', name: 'ftype_1', id: 'ff_1'});
	div.create('label',{'for': 'ff_1',textNode: 'Фиксированное значение'});
	var hand=div.create('div',{id:'f_div_1', className: 'white',style:{display:'none'}});
	hand.create('input', {className: 'button', id: 'fbut_1', value: 'Метка', onclick: 'function(){chooseFilter(1,'+l+')}', type: 'button'});
	var fixinner=div.create('div',{id:'fix_div', className: 'white',style:{display:'none',padding:'0px'}});
	var fixdiv=fixinner.create('div',{id:'fix_div_1', className: 'white',style:{padding:'0px',border:'none'}});
	var add=fixdiv.create('input', {className: 'button', id: 'addbut_1', value: 'Добавить', onclick: 'function(){limitsConstructor("ФИЛЬТРОВ",1,'+l+')}', type: 'button'});
}

function formLimits(l)
{
	var doc=take('sendwinform');
	doc.n.innerHTML="";
	var div=doc.create('div',{id:'limits_1'});
	div.create('span',{className: 'floatleft',textNode: 'Название ограничения', style:{color: '#069',fontWeight:'bold',width:'200px'}});
	div.create('input',{type: 'text', name:'limittitle_1', id:'limittitle_1', value: '', style:{width: '490px', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
	var span=div.create('span',{className: 'block', style:{width:'50%'}});
	span.create('input',{onclick: 'function(){showHandParameters("hand_1")}', type: 'radio',value: 'hand', name: 'takefrom_1', id: 'hand_1'});
	span.create('label',{'for': 'hand_1',textNode: 'Ручной ввод', style: {marginRight: '5px'}});
	span.create('input',{onclick: 'function(){showFixParameters("fix_1")}', type: 'radio',value: 'fix', name: 'takefrom_1', id: 'fix_1'});
	span.create('label',{'for': 'fix_1',textNode: 'Фиксированное значение'});
	var hinner=div.create('div',{id:'hand_div', className: 'white', style:{display:'none',padding:'0px'}});
	var hand=hinner.create('div',{id:'hand_div_1', className: 'white', style:{padding:'0px',border:'none'}});
	hand.create('input', {className: 'button', id: 'labbut_1', value: 'Метка', onclick: 'function(){chooseLabel(1,'+l+')}', type: 'button'});
	hand.create('input',{onclick: 'function(){checkHand("one_1")}', type: 'radio',value: 'one', name: 'inputtype_1', id: 'one_1'});
	hand.create('label',{'for': 'one_1',textNode: 'Текстовое поле', style: {marginRight: '5px'}});
	hand.create('input',{onclick: 'function(){checkHand("period_1")}', type: 'radio',value: 'period', name: 'inputtype_1', id: 'period_1'});
	hand.create('label',{'for': 'period_1',textNode: 'Период (для типа DATE)'});
	var finner=div.create('div',{id:'fix_div', className: 'white', style:{display:'none',padding:'0px'}});
	var fix=finner.create('div',{id:'fix_div_1', className: 'white', style:{padding:'0px',border:'none'}});
	fix.create('input', {className: 'button', id: 'addbut_1', value: 'Добавить', onclick: 'function(){limitsConstructor("ОГРАНИЧЕНИЙ",1,'+l+')}', type: 'button'});
}

function putLabel(num,c)
{
	var arr=take('sendwinform').getsign('input',{checked:true});
	var doc=take('bc_'+num);
	var div=take(doc.n.childNodes[c].lastChild);
	for(var i=0; i<arr.length; i++)
	{
		var span=div.create('div');
		var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
		down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
		up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
		downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
		upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
		minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
		span.create('span',{className: 'floatleft',textNode: arr[i].name,style:{color: '#069',fontWeight:'bold',width:'40px'}});
		span.create('input',{type: 'text', className: arr[i].className, name: arr[i].name, value: arr[i].title, title: arr[i].value, style: {width:'70%', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
		span.create('br',{style:{clear:'both'}});
		span.create('input',{type: 'checkbox', name: 'invis',title:'только для поиска из подробной выходной формы', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
		span.create('b',{textNode: 'Не отображать в списке',style:{color: '#069'}});
		span.create('br');
		var irole=span.create('input',{onclick: 'roleDisplay', type: 'checkbox',id: 'rolecont_'+arr[i].name+'_'+num, name: 'role',title:'для библиопоиска', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
		span.create('b',{textNode: 'Роль',style:{color: '#069'}});
		var irole1=span.create('span',{id: 'role_rolecont_'+arr[i].name+'_'+num,style:{display:'none'}});
		irole1.create('span',{textNode: 'Выбор роли'});
		var rselect=irole1.create('select',{id: 'select_role_rolecont_'+arr[i].name+'_'+num, 'name': 'select_role_rolecont', className: 'check'});
		rselect.create('option',{textNode:'',value:''});
		for(var key in roles)
		{
			rselect.create('option',{textNode: roles[key],title:key,value:key});
		}
		span.create('br');
		var ifacet=span.create('input',{onclick: 'facetDisplay', type: 'checkbox',id: 'facetcont_'+arr[i].name+'_'+num, name: 'facet',title:'Фасет', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
		span.create('b',{textNode: 'Фасет',style:{color: '#069'}});
		var ifacet1=span.create('span',{id: 'facet_facetcont_'+arr[i].name+'_'+num,style:{display:'none'}});
		var ifacetdisplay=ifacet1.create('input',{type: 'checkbox',id: 'facetdisplay_'+arr[i].name+'_'+num, name: 'facetdisplay',title:'свернутый вид', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
		ifacet1.create('b',{textNode: 'свернутый вид',style:{color: '#069'}});
		var ifacetselect=ifacet1.create('select',{id: 'ifacetselect_'+arr[i].name+'_'+num, name: 'ifacetselect', className: 'check'});
		ifacetselect.create('option',{textNode: 'по количеству записей',value:'count',selected:true});
		ifacetselect.create('option',{textNode: 'по значению фасета',value:'index'});
		ifacet1.create('b',{textNode: 'сортировать',style:{color: '#069',margin:'0 10px'}});
		var ifacetselectorder=ifacet1.create('select',{id: 'ifacetselect_order_'+arr[i].name+'_'+num, name: 'ifacetselectorder', className: 'check'});
		ifacetselectorder.create('option',{textNode: 'по убыванию',value:'desc',selected:true});
		ifacetselectorder.create('option',{textNode: 'по возрастанию',value:'asc'});
		ifacet1.create('b',{textNode: 'направление',style:{color: '#069',margin:'0 10px'}});
		//ifacet1.create('br');
		ifacet1.create('span',{textNode: 'Список имен меток-фасетов, определенных для этой метки (заполняется для реализации через ADABAS)'});
		//ifacet1.create('br');
		ifacet1.create('textarea',{id: 'facet_list_'+arr[i].name+'_'+num, 'name': 'facet_list', value: '', textNode: '', style: {width:'70%', padding: '3px', margin: '3px 3px 3px 50px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'},title:'NAME1,NAME2,NAME3...',placeHolder:'NAME1,NAME2,NAME3...'});
		span.create('br');
		var ifacetweight=span.create('textarea',{id: 'facetweight_'+arr[i].name+'_'+num, name: 'facetweight',title:'от 1 до 100', value: '', textNode: '', style: {margin: '0 0 0 5px', border: 'solid 1px #069',width:'40px',height:'20px',overflow:'hidden'},placeHolder:'1'});
		span.create('b',{textNode: 'вес (приоритет)',style:{color: '#069',margin:'0 10px'}});
	}
	delLayerWin();
}

function putLimit(ind,num,c)
{
	var ltitle=take('limittitle_1').n;
	if(ltitle.value=="")
	{
		alert('Введите название ограничения!');
		return;
	}
	var dat=new Date();
	var today=dat.getTime();
	var doc=take('bc_'+num);
	var div=take(doc.n.childNodes[c].lastChild);
	var span=null;
	if(ind==null)
		span=div.create('div',{className:'white', id: 'lim'+'_'+num+'_'+c+'_'+today});
	else
	{
		span=take(ind);
		span.n.innerHTML="";
	}
	var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
	down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
	up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
	downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
	upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
	minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var edit=span.create('span',{className: 'edit1',title:'Редактировать',onclick: 'editLimit', onmouseover: 'function(){setCursor(this)}'});
	edit.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	span.create('span',{textNode: ltitle.value,style:{color: '#069',fontWeight:'bold',width:'200px'}});

	var check=take(ltitle.nextSibling).getsign('input',{checked:true})[0].value;
	switch(check)
	{
		case 'hand':
			if(take('hand_div_1').n.firstChild.firstChild!=null)
			{
				var htype=take('hand_div_1').getsign('input',{checked:true})[0].value;
				span.create('input',{type: 'hidden', name: take('hand_div_1').n.firstChild.firstChild.className, value: htype});
			}
			else
			{
				alert("Вы не выбрали метку для ограничения!");
				return;
			}
		break;
		case 'fix':
			var arr=take('fix_div').getsign('div',{className:'white'});
			var sel=span.create('select',{className:arr[1].firstChild.lastChild.className,name: 'limitname',style:{width:'350px'}});
			for(var i=0; i<arr.length; i++)
			{
				if(arr[i].firstChild.nodeName.toLowerCase()=='div')
				{
					sel.create('option',{value: arr[i].firstChild.firstChild.innerHTML,textNode: arr[i].firstChild.lastChild.value});
				}
			}
		break;
		default:break;
	}
	delLayerWin();
}

function putFilter(ind,num,c)
{
	var ltitle=take('ftitle_1').n;
	if(ltitle.value=="")
	{
		alert('Введите название фильтра!');
		return;
	}
	var doc=take('bc_'+num);
	var dat=new Date();
	var today=dat.getTime();
	var div=take(doc.n.childNodes[c].lastChild);
	var span=null;
	if(ind==null)
		span=div.create('div',{className:'white', id: 'fil'+'_'+num+'_'+c+'_'+today});
	else
	{
		span=take(ind);
		span.n.innerHTML="";
	}
	var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
	down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
	up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
	downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
	upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
	minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	var edit=span.create('span',{className: 'edit1',title:'Редактировать',onclick: 'editLimit', onmouseover: 'function(){setCursor(this)}'});
	edit.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
	span.create('span',{textNode: ltitle.value,style:{color: '#069',fontWeight:'bold',width:'200px'}});
	var check=take('filters_1').getsign('input',{checked:true})[0].value;
	switch(check)
	{
		case 'fd':
			if(take('f_div_1').n.firstChild.firstChild!=null)
			{
				var htype=take('filters_1').getsign('input',{checked:true})[0].value;
				span.create('input',{type: 'hidden', name: take('f_div_1').n.firstChild.firstChild.className, value: take('f_div_1').n.firstChild.firstChild.className});
			}
			else
			{
				alert("Вы не выбрали метку для фильтра!");
				return;
			}
		break;
		case 'ff':
			var arr=take('fix_div').getsign('div',{className:'white'});
			var sel=span.create('select',{name: 'filtername',className: arr[1].firstChild.lastChild.className,style:{width:'350px'}});
			for(var i=0; i<arr.length; i++)
			{
				if(arr[i].firstChild.nodeName.toLowerCase()=='div')
				{
					sel.create('option',{value: arr[i].firstChild.firstChild.innerHTML,textNode: arr[i].firstChild.lastChild.value});
				}
			}
			var elsespan=span.create('span',{style:{display:'block'}});
			elsespan.create('input',{type: 'checkbox', name: 'putelse', value: '', checked:true});
			elsespan.create('span',{textNode:'добавить кнопку "еще..."'});
			//span.n.replaceChild(elsespan.n,span.n.firstChild);
		break;
		default:break;
	}
	delLayerWin();
}

function displayRubricator()
{
	var next=this.nextSibling.nextSibling;
	if(this.checked)
	{
		take(next).show();
	}
	else
	{
		take(next).hide();
	}
}

function displayType()
{
	/*var arr=take('frm').getsign('input',{className: 'bases'});
	var count=0;
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i].checked)
			count++;
	}
	if(count>1)
		take('choice').show();
	else
		take('choice').hide();*/
	if(this.nextSibling.nextSibling)
	{
		this.nextSibling.nextSibling.style.display=(this.checked)?"":"none";
	}
	findDispay();
}

function savePath()
{
	var obj={};
	obj.BROKERID=(take('BROKERID').n.nodeName.toLowerCase()=="input")?take('BROKERID').n.value:take('BROKERID').n.innerHTML;
	obj.foldername=(take('foldername').n.nodeName.toLowerCase()=="input")?take('foldername').n.value:take('foldername').n.innerHTML;
	obj.servername=(take('servername').n.nodeName.toLowerCase()=="input")?take('servername').n.value:take('servername').n.innerHTML;
	obj.serveraddr=(take('serveraddr').n.nodeName.toLowerCase()=="input")?take('serveraddr').n.value:take('serveraddr').n.innerHTML;
	obj.opacdocumentroot=(take('opacdocumentroot').n.nodeName.toLowerCase()=="input")?take('opacdocumentroot').n.value:take('opacdocumentroot').n.innerHTML;
	obj.dirhtdocs=(take('dirhtdocs').n.nodeName.toLowerCase()=="input")?take('dirhtdocs').n.value:take('dirhtdocs').n.innerHTML;
	obj.foldercgibin=(take('foldercgibin').n.nodeName.toLowerCase()=="input")?take('foldercgibin').n.value:take('foldercgibin').n.innerHTML;
	obj.dircgibin=(take('dircgibin').n.nodeName.toLowerCase()=="input")?take('dircgibin').n.value:take('dircgibin').n.innerHTML;
	obj.dircgibin=(take('dircgibin').n.nodeName.toLowerCase()=="input")?take('dircgibin').n.value:take('dircgibin').n.innerHTML;
	obj.pathcgi=(take('pathcgi').n.nodeName.toLowerCase()=="input")?take('pathcgi').n.value:take('pathcgi').n.innerHTML;
	obj.pathactrcp=(take('pathactrcp').n.nodeName.toLowerCase()=="input")?take('pathactrcp').n.value:take('pathactrcp').n.innerHTML;
	obj.pathfind=(take('pathfind').n.nodeName.toLowerCase()=="input")?take('pathfind').n.value:take('pathfind').n.innerHTML;
	obj.pathreg=(take('pathreg').n.nodeName.toLowerCase()=="input")?take('pathreg').n.value:take('pathreg').n.innerHTML;
	obj.pathcss=(take('pathcss').n.nodeName.toLowerCase()=="input")?take('pathcss').n.value:take('pathcss').n.innerHTML;
	obj.thefullcsspath=(take('thefullcsspath').n.nodeName.toLowerCase()=="input")?take('thefullcsspath').n.value:take('thefullcsspath').n.innerHTML;
	obj.pathjs=(take('pathjs').n.nodeName.toLowerCase()=="input")?take('pathjs').n.value:take('pathjs').n.innerHTML;
	obj.thefulljspath=(take('thefulljspath').n.nodeName.toLowerCase()=="input")?take('thefulljspath').n.value:take('thefulljspath').n.innerHTML;
	obj.pathimg=(take('pathimg').n.nodeName.toLowerCase()=="pathimg")?take('pathimg').n.value:take('pathimg').n.innerHTML;
	obj.pathhtml=(take('pathhtml').n.nodeName.toLowerCase()=="input")?take('pathhtml').n.value:take('pathhtml').n.innerHTML;
	obj.pathdoc=(take('pathdoc').n.nodeName.toLowerCase()=="input")?take('pathdoc').n.value:take('pathdoc').n.innerHTML;
	obj.pathrubricator=(take('pathrubricator').n.nodeName.toLowerCase()=="input")?take('pathrubricator').n.value:take('pathrubricator').n.innerHTML;
	obj.thepagespath=(take('thepagespath').n.nodeName.toLowerCase()=="input")?take('thepagespath').n.value:take('thepagespath').n.innerHTML;
	obj.themodulespath=(take('themodulespath').n.nodeName.toLowerCase()=="input")?take('themodulespath').n.value:take('themodulespath').n.innerHTML;
	obj.theincludespath=(take('theincludespath').n.nodeName.toLowerCase()=="input")?take('theincludespath').n.value:take('theincludespath').n.innerHTML;
	obj.commoninipath=(take('commoninipath').n.nodeName.toLowerCase()=="input")?take('commoninipath').n.value:take('commoninipath').n.innerHTML;
	obj.rcppathfile=(take('rcppathfile').n.nodeName.toLowerCase()=="input")?take('rcppathfile').n.value:take('rcppathfile').n.innerHTML;
	obj.rcppathbegin=(take('rcppathbegin').n.nodeName.toLowerCase()=="input")?take('rcppathbegin').n.value:take('rcppathbegin').n.innerHTML;
	obj.rcpunloaddir=(take('rcpunloaddir').n.nodeName.toLowerCase()=="input")?take('rcpunloaddir').n.value:take('rcpunloaddir').n.innerHTML;
	obj.rcphtmldir=(take('rcphtmldir').n.nodeName.toLowerCase()=="input")?take('rcphtmldir').n.value:take('rcphtmldir').n.innerHTML;
	obj.rcporderdir=(take('rcporderdir').n.nodeName.toLowerCase()=="input")?take('rcporderdir').n.value:take('rcporderdir').n.innerHTML;
	obj.rcporderhtml=(take('rcporderhtml').n.nodeName.toLowerCase()=="input")?take('rcporderhtml').n.value:take('rcporderhtml').n.innerHTML;
	obj.rcphandlerpath=(take('rcphandlerpath').n.nodeName.toLowerCase()=="input")?take('rcphandlerpath').n.value:take('rcphandlerpath').n.innerHTML;
	obj.userlogin=(take('userlogin').n.nodeName.toLowerCase()=="input")?take('userlogin').n.value:take('userlogin').n.innerHTML;
	obj.userpassword=(take('userpassword').n.nodeName.toLowerCase()=="input")?take('userpassword').n.value:take('userpassword').n.innerHTML;
	obj.guestlogin=(take('guestlogin').n.nodeName.toLowerCase()=="input")?take('guestlogin').n.value:take('guestlogin').n.innerHTML;
	obj.guestpassword=(take('guestpassword').n.nodeName.toLowerCase()=="input")?take('guestpassword').n.value:take('guestpassword').n.innerHTML;
	obj.login045=(take('login045').n.nodeName.toLowerCase()=="input")?take('login045').n.value:take('login045').n.innerHTML;
	obj.password045=(take('password045').n.nodeName.toLowerCase()=="input")?take('password045').n.value:take('password045').n.innerHTML;
	obj.rcpdns=(take('rcpdns').n.nodeName.toLowerCase()=="input")?take('rcpdns').n.value:take('rcpdns').n.innerHTML;
	obj.rcpaddress=(take('rcpaddress').n.nodeName.toLowerCase()=="input")?take('rcpaddress').n.value:take('rcpaddress').n.innerHTML;
	obj.mailhostname=(take('mailhostname').n.nodeName.toLowerCase()=="input")?take('mailhostname').n.value:take('mailhostname').n.innerHTML;
	obj.maillogin=(take('maillogin').n.nodeName.toLowerCase()=="input")?take('maillogin').n.value:take('maillogin').n.innerHTML;
	obj.mailpassword=(take('mailpassword').n.nodeName.toLowerCase()=="input")?take('mailpassword').n.value:take('mailpassword').n.innerHTML;
	obj.rcptitle=(take('rcptitle').n.nodeName.toLowerCase()=="input")?take('rcptitle').n.value:take('rcptitle').n.innerHTML;
	obj.rcpsmalltitle=(take('rcpsmalltitle').n.nodeName.toLowerCase()=="input")?take('rcpsmalltitle').n.value:take('rcpsmalltitle').n.innerHTML;
	obj.rcpmetacontenttype=(take('rcpmetacontenttype').n.nodeName.toLowerCase()=="input")?take('rcpmetacontenttype').n.value:take('rcpmetacontenttype').n.innerHTML;
	obj.rcpmetacontentscripttype=(take('rcpmetacontentscripttype').n.nodeName.toLowerCase()=="input")?take('rcpmetacontentscripttype').n.value:take('rcpmetacontentscripttype').n.innerHTML;
	obj.rcpmetakeywords=(take('rcpmetakeywords').n.nodeName.toLowerCase()=="input")?take('rcpmetakeywords').n.value:take('rcpmetakeywords').n.innerHTML;
	obj.rcpauthor=(take('rcpauthor').n.nodeName.toLowerCase()=="input")?take('rcpauthor').n.value:take('rcpauthor').n.innerHTML;
	obj.rcpcopyright=(take('rcpcopyright').n.nodeName.toLowerCase()=="input")?take('rcpcopyright').n.value:take('rcpcopyright').n.innerHTML;
	obj.rcppostaddress=(take('rcppostaddress').n.nodeName.toLowerCase()=="input")?take('rcppostaddress').n.value:take('rcppostaddress').n.innerHTML;
	obj.rcpphonenumber=(take('rcpphonenumber').n.nodeName.toLowerCase()=="input")?take('rcpphonenumber').n.value:take('rcpphonenumber').n.innerHTML;
	obj.rcpmailto=(take('rcpmailto').n.nodeName.toLowerCase()=="input")?take('rcpmailto').n.value:take('rcpmailto').n.innerHTML;
	obj.rcpdescription=(take('rcpdescription').n.nodeName.toLowerCase()=="input")?take('rcpdescription').n.value:take('rcpdescription').n.innerHTML;
	obj.biblioserver=(take('biblioserver').n.nodeName.toLowerCase()=="input")?take('biblioserver').n.value:take('biblioserver').n.innerHTML;
	obj.biblioapi=(take('biblioapi').n.nodeName.toLowerCase()=="input")?take('biblioapi').n.value:take('biblioapi').n.innerHTML;
	if((obj.userlogin=='')||(obj.userpassword=='')||(obj.guestlogin=='')||(obj.guestpassword=='')||(obj.login045=='')||(obj.password045=='')||(obj.rcpdns=='')||(obj.rcpaddress=='')||(obj.maillogin=='')||(obj.mailpassword=='')||(obj.mailhostname==''))
	{
		alert('Вы не заполнили необходимые поля!');
		return;
	}
	var qstr='{';
	for(key in obj)
	{
		var val=obj[key];
		qstr+='"'+key+'":"'+val+'",';
	}
	qstr+='"end":"end"}';
	var gArr=new Array();
	gArr.push(["jsonpath",qstr]);
	callToRCP(gArr,self,'conf.php');
}

function saveInterface()
{
	var arr=take('frm').getsign('input',{className:'check'});
	var obj={};
	for(var i=0; i<arr.length; i++)
	{
		obj[arr[1].id]=arr.checked;
	}
	var qstr='{';
	for(key in obj)
	{
		var val=obj[key];
		qstr+='"'+key+'":"'+val+'",';
	}
	qstr+='"end":"end"}';
	var gArr=new Array();
	gArr.push(["jsoninterface",qstr]);
	callToRCP(gArr,self,'conf.php');
}

function displaySearchInterface(o)
{
	take('invitation').show();
}

function editPathSettings(p)
{
	var gArr=new Array();
	gArr.push(["jsoneditpath",p]);
	callToRCP(gArr,self,'conf.php');
}

function editBaseSettings(p)
{
	var arg={};
	arg.target=self;
	arg.cls='loader1';
	showLayerWin('loader1win',arg);
	setTimeout(function()
	{
		var gArr=new Array();
		gArr.push(["jsoneditbasepath","../../custom/conf/db.conf"]);
		ajaxToRCP(gArr,backEditBaseSettings,'default/php/dbload.php');
	}, 100);
}

function backEditBaseSettings(x)
{
	/*var w=window.open();
	w.document.open();
	w.document.write(x.responseText);
	w.document.close();*/
	eval(x.responseText);
	if(typeof error!="undefined")
	{
		delLayerWin();
		WriteError(error);
	}
	else
	{
		delLayerWin();
		take('basesets').hide();
		take('invitation').hide();
		take('editdiv').hide();
		var doc=take('frm');
		var div=doc.create('div');
		div.create('input',{className:'wr',id:'wi1',name:'wi1',type:'checkbox',checked:true});
		div.create('label',{className: 'wrapped', 'for': 'wi1', textNode: 'Настройка поискового интерфейса'});
		var container=div.create('div',{className:'expl'});
		var arr=rezult.switchinterface;
		var simple=false;
		var expand=false;
		var quantity=3;
		var tie=false;
		var professional=false;
		var fundholders=false;
		var authority=false;
		var fulltext=false;
		var map_search=false;
		var list_regions=false;
		var map_width="";
		var map_height="";
		var cords_path="";
		var usort=false;
		var ulight=false;
		var ublind=false;
		var biblio=false;
		var bibliowidget=false;
		var bibliowidgetid="";
		var solr=false;
		var switch_in_base="";
		var choose_af=false;
		var affindnumber="";
		var affindbroker="";
		var affindlogin="";
		var fundnumber="";
		var fundbroker="";
		var fundslabel="";
		var searchfundslabel="";
		var fundalias="";
		var fundlogin="";
		var aflabname="";
		var aflabtitle="";
		var prefind=false;
		var aflabdis="";
		var fltlabname="";
		var fltlabdis="";
		var shotform="";
		var fullform="";
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].id=="simple")
			{
				simple=true;
				shotform=(typeof arr[i].outform!="undefined")?arr[i].outform:'SHOTFORM';
				fullform=(typeof arr[i].outformfull!="undefined")?arr[i].outformfull:'FULLFORM';
			}
			if(arr[i].id=="expand")
			{
				expand=true;
				quantity=arr[i].quantity;
				tie=arr[i].tie;
			}
			if(arr[i].id=="professional")
			{
				professional=true;
			}
			if(arr[i].choose_af=="true")
			{
				choose_af=true;
			}
			if(arr[i].id=="fundholders")
			{
				fundholders=true;
				switch_in_base=arr[i].switch_in_base;
				fundnumber=arr[i].fundnumber;
				if(typeof arr[i].fundbroker !="undefined")
					fundbroker=arr[i].fundbroker;
				if(typeof arr[i].search_label !="undefined")
					fundslabel=arr[i].search_label;
				if(typeof arr[i].bibl_search_label !="undefined")
					searchfundslabel=arr[i].bibl_search_label;
				fundalias=arr[i].fundalias;
				if(typeof arr[i].fundlogin !="undefined")
					fundlogin=arr[i].fundlogin;
			}
			if(arr[i].id=="authority")
			{
				authority=true;
				aflabname=arr[i].label;
				aflabtitle=arr[i].title;
				if(arr[i].prefind)
					prefind=true;
				aflabdis="";
				affindbroker=arr[i].affindbroker;
				affindlogin=arr[i].affindlogin;
			}
			if(arr[i].id=="fulltext")
			{
				fulltext=true;
				fltlabname=arr[i].base;
				fltlabdis=""
			}
			if(arr[i].id=="mapsearch")
			{
				map_search=true;
				map_width=arr[i].mapwidth;
				map_height=arr[i].mapheight;
				if(typeof arr[i].listregions !="undefined")
					list_regions=true;
				cords_path=arr[i].cordspath;
			}
			if(arr[i].id=="blind")
			{
				ublind=true;
			}
			if(arr[i].id=="uselight")
			{
				ulight=true;
			}
			if(arr[i].id=="usesort")
			{
				usort=true;
			}
			if(arr[i].id=="biblio")
			{
				biblio=true;
			}
			if(arr[i].id=="bibliowidget")
			{
				bibliowidget=true;
				bibliowidgetid=arr[i].value;
			}
			if(arr[i].id=="solr")
			{
				solr=true;
			}
		}
		var simpl=container.create('div');
		var sspan=simpl.create('span', {className: 'floatleft'});
		sspan.create('input',{type: 'checkbox',id: 'simple', 'name': 'simple', value: 'простой поиск', className: 'check', checked: true, disabled:true});
		if(simple)
			take('simple').n.checked=true;
		else
			take('simple').n.checked=false;			
		sspan.create('label',{'for':'simple',textNode: 'ПРОСТОЙ ПОИСК'});
		sspan.create('input',{type: 'hidden',id: 'shotform', 'name': 'shotform', value: shotform});
		sspan.create('input',{type: 'hidden',id: 'fullform', 'name': 'fullform', value: fullform});
		simpl.create('br',{style: {clear: 'both'}});
		var expan=container.create('div');
		var exspan=expan.create('span',{onclick: 'checkFields', className: 'floatleft'});
		exspan.create('input',{type: 'checkbox',id: 'expand', 'name': 'expand', value: 'расширенный поиск', className: 'check',checked: expand});
		if(expand)
			take('expand').n.checked=true;
		else
			take('expand').n.checked=false;
		exspan.create('label',{'for':'expand',textNode: 'РАСШИРЕННЫЙ ПОИСК'});
		var exspan1=null;
		if(expand)
			exspan1=expan.create('span',{id: 'fieldscontainer', className: 'floatleft',style:{margin:'0px',padding:'0px'}});
		else
			exspan1=expan.create('span',{id: 'fieldscontainer', className: 'floatleft',style:{display:'none',margin:'0px',padding:'0px'}});
		exspan1.create('input',{id: 'quantity','name': 'quantity',type: 'text',className: 'check', value: quantity, maxLength: '1',style:{margin:'5px 0px 0px 5px',padding:'0px',height:'20px',width:'20px',textAlign:'center',border:'solid 1px #069'}});
		exspan1.create('label',{'for':'quantity',textNode: 'Полей в расширенном поиске'});
		exspan1.create('input',{type: 'checkbox',id: 'tie', 'name': 'tie', value: 'объединять', className: 'check',style:{margin:'5px 0px 0px 10px'}});
		if(tie=="true")
			take('tie').n.checked=true;
		else
			take('tie').n.checked=false;			
		exspan1.create('label',{'for':'tie',textNode: 'ОБЪЕДИНЯТЬ ПОЛЯ И/ИЛИ/НЕ'});
		exspan1.create('br',{style: {clear: 'both'}});
		var profs=container.create('div');
		var pspan=profs.create('span', {onclick: 'checkAfs', className: 'floatleft'});
		pspan.create('input',{type: 'checkbox',id: 'professional', 'name': 'professional', value: 'профессиональный поиск', className: 'check'});
		pspan.create('label',{'for':'professional',textNode: 'ПРОФЕССИОНАЛЬНЫЙ ПОИСК'});
		var pspan1=null;
		if(professional)
		{
			take('professional').n.checked=true;
			pspan1=profs.create('span',{id: 'afscontainer', className: 'floatleft'});
		}
		else
		{
			take('professional').n.checked=false;
			pspan1=profs.create('span',{id: 'afscontainer', className: 'floatleft', style:{display:'none'}});
		}
		var ppspan1=pspan1.create('span',{onclick: 'chooseAfs', className: 'floatleft',style:{margin:'0px',padding:'0px'}});
		ppspan1.create('input',{type: 'checkbox',id: 'choose_af', 'name': 'choose_af', value: 'алфавитный список', className: 'check'});
		ppspan1.create('label',{'for':'choose_af',textNode: 'алфавитный список'});
		
		profs.create('br',{style: {clear: 'both'}});

		var af=container.create('div');
		var afspan=af.create('span', {className: 'floatleft'});
		afspan.create('input',{type: 'checkbox',id: 'af_int', 'name': 'af_int', value: 'поиск в аф', className: 'check',onclick:'showBases'});
		afspan.create('label',{'for':'af_int',textNode: 'ПОИСК В АФ'});
		var afspan1=null;
		if(authority)
		{
			take('af_int').n.checked=true;
			afspan1=af.create('span',{id: 'aflabscontainer', className: 'floatleft'});
		}
		else
		{
			take('af_int').n.checked=false;
			afspan1=af.create('span',{id: 'aflabscontainer', className: 'floatleft',style:{display:'none'}});
		}
		afspan1.create('span',{textNode: 'Имя метки для поиска в BIBL'});
		afspan1.create('input',{type:'text',className:'check',id: 'aflabname', value: aflabname,style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		afspan1.create('span',{textNode: 'Название метки для поиска в BIBL'});
		afspan1.create('input',{type:'text',className:'check',id: 'aflabalias', value: aflabtitle,style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
		
		afspan1.create('span',{textNode: 'Предварительный поиск по всем АФ'});
		afspan1.create('input',{type:'checkbox',id: 'prefind', value: ''});
		
		var pppspan1=af.create('span',{id:'affind', className: 'floatleft',style:{display:'none'}});
		pppspan1.create('span',{textNode:'BrokerId'});
		pppspan1.create('input',{type:'text',className:'check',id: 'affindbroker', value: affindbroker,style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
		pppspan1.create('span',{textNode:'Логин'});
		pppspan1.create('input',{type:'text',className:'check',id: 'affindlogin', value: affindlogin,style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
		if(choose_af)
		{
			take('choose_af').n.checked=true;
			take('affind').show();
		}
		else
		{
			take('choose_af').n.checked=false;
			take('affind').hide();
		}
		if(authority)
		{
			take('affind').show();
			if(prefind)
				take('prefind').n.checked=true;
		}
		else
		{
			take('affind').hide();
		}
		af.create('br',{style: {clear: 'both'}});

		var fnd=container.create('div');
		var fspan=fnd.create('span',{onclick: 'checkDisplay', className: 'floatleft'});
		fspan.create('input',{type: 'checkbox',id: 'fundholders', 'name': 'fundholders', value: 'фондодержатели', className: 'check', checked: fundholders});
		if(fundholders)
			take('fundholders').n.checked=true;
		else
			take('fundholders').n.checked=false;
		fspan.create('label',{'for':'fundholders',textNode: 'ПОИСК ФОНДОДЕРЖАТЕЛЕЙ'});
		var fspan1=null;
		if(fundholders)
			fspan1=fnd.create('span',{id: 'fholderscontainer', className: 'floatleft'});
		else
			fspan1=fnd.create('span',{id: 'fholderscontainer', className: 'floatleft',style:{display:'none'}});
		fspan1.create('span',{textNode: 'Выбор БД'});
		var fselect=fspan1.create('select',{id: 'switch_in_base', 'name': 'switch_in_base', className: 'check',onchange:'findDispay'});
		fselect.create('option',{textNode: 'в списке баз данных',value:'in_base'});
		fselect.create('option',{textNode: 'в поисковом интерфейсе',value:'in_interface'});
		fselect.create('option',{textNode: 'не отображать в интерфейсе',value:'none'});
		var opt=0;
		if(switch_in_base=='in_base')
			opt=0;
		else if(switch_in_base=='in_interface')
			opt=1;
		else
			opt=2;
		take('switch_in_base').n.options[opt].selected=true;
		fspan1.create('span',{textNode:'№ БД'});
		fspan1.create('input',{type:'text',className:'check',id: 'fundnumber', value: fundnumber, maxLength: '4',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		fspan1.create('span',{textNode:'Псевдоним в интерфейсе'});
		fspan1.create('input',{type:'text',className:'check',id: 'fundalias', value: fundalias,style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
		fspan1.create('br');
		fspan1.create('span',{textNode:'Имя метки'});
		fspan1.create('input',{type:'text',className:'check',id: 'fundslabel', value: fundslabel,style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		fspan1.create('span',{textNode:'Метка для поиска в библиографии'});
		fspan1.create('input',{type:'text',className:'check',id: 'searchfundslabel', value: searchfundslabel,style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		fspan1.create('br');
		fspan1.create('span',{textNode:'BrokerId'});
		fspan1.create('input',{type:'text',className:'check',id: 'fundbroker', value: fundbroker,style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});
		fspan1.create('span',{textNode:'Логин'});
		fspan1.create('input',{type:'text',className:'check',id: 'fundlogin', value: fundlogin,style:{margin:'0px',padding:'0px',height:'20px',width:'150px',textAlign:'center',border:'solid 1px #069'}});		
		fnd.create('br',{style: {clear: 'both'}});
		
		var smap=container.create('div');
		var smapspan=smap.create('span', {className: 'block'});
		smapspan.create('input',{type: 'checkbox',id: 'map_inp', 'name': 'map_inp', value: 'поиск по карте', className: 'check',onclick:'showMapDiv'});
		smapspan.create('label',{'for':'map_inp',textNode: 'ПОИСК ПО КАРТЕ'});
		var smapspan1=smap.create('span',{id: 'mapcontainer', style:{margin:'0'}});
		smapspan1.create('input',{type:'text',id: 'smapwidth', value: '',style:{margin:'5px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		smapspan1.create('label',{'for':'smapwidth',textNode: 'Ширина карты'});
		smapspan1.create('input',{type:'text',id: 'smapheight', value: '',style:{margin:'5px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		smapspan1.create('label',{'for':'smapheight',textNode: 'Высота карты'});
		smapspan1.create('input',{'type':'checkbox',id:'listregions','name':'listregions','value':'listregions', style:{margin:'5px'}});
		smapspan1.create('label',{'for':'listregions',textNode: 'Выводить список областей региона при открытии увеличенной карты региона с областями'});
		smapspan1.create('br');
		smapspan1.create('input',{type: 'button',id: 'smaploadbutton', 'name': 'smaploadbutton', value: 'Загрузить координаты (карта России)', className: 'button',onclick:'loadCords',style:{width:'310px',margin:'5px'}});
		smapspan1.create('input',{type: 'button',id: 'smapeditbutton', 'name': 'smapeditbutton', value: 'Добавить/редактировать координаты', className: 'button',onclick:'editCords',style:{width:'310px',style:{margin:'5px'}}});
		if(map_search)
		{
			take('map_inp').n.checked=true;
			if(list_regions)
				take('listregions').n.checked=true;
			else
				take('listregions').n.checked=false;
			smapspan1.create('br');
			smapspan1.create('u',{textNode:'Координаты загружены по адресу',style:{margin:'0 0 0 5px'}});
			smapspan1.create('input',{type: 'text',id:'iscords',name:'iscords',value:cords_path,disabled:'disabled',style:{width:'auto',minWidth:'500px',border:'none',padding:'5px',margin:'5px'}});
		}
		else
		{
			take('map_inp').n.checked=false;
			take('mapcontainer').hide();
		}		
		
		/*var flt=container.create('div');
		var fltspan=flt.create('span', {className: 'floatleft'});
		fltspan.create('input',{type: 'checkbox',id: 'flt_int', 'name': 'flt_int', value: 'поиск по полному тексту', className: 'check',onclick:'showFl', disabled:true});
		fltspan.create('label',{'for':'flt_int',textNode: 'ПОИСК ПО ПОЛНОМУ ТЕКСТУ'});
		var fltspan1=null;
		if(fulltext)
		{
			take('flt_int').n.checked=true;
			fltspan1=flt.create('span',{id: 'fltlabscontainer', className: 'floatleft'});
		}
		else
		{
			take('flt_int').n.checked=false;
			fltspan1=flt.create('span',{id: 'fltlabscontainer', className: 'floatleft',style:{display:'none'}});
		}
		fltspan1.create('span',{textNode: 'Номер базы данных'});
		fltspan1.create('input',{type:'text',className:'check',id: 'fltlabname', value: fltlabname,style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		flt.create('br',{style: {clear: 'both'}});*/
		
		var ulightdiv=container.create('div');
		var ulightspan=ulightdiv.create('span', {className: 'floatleft'});
		ulightspan.create('input',{type: 'checkbox',id: 'uselight', 'name': 'uselight', value: 'подсветка поискового термина', className: 'check'});
		ulightspan.create('label',{'for':'uselight',textNode: 'ПОДСВЕТКА ПОИСКОВОГО ТЕРМИНА'});
		if(ulight)
			take('uselight').n.checked=true;
		else
			take('uselight').n.checked=false;
		ulightdiv.create('br',{style: {clear: 'both'}});
		
		var usortdiv=container.create('div');
		var usortspan=usortdiv.create('span', {className: 'floatleft'});
		usortspan.create('input',{type: 'checkbox',id: 'usesort', 'name': 'usesort', value: 'сортировка результатов поиска', className: 'check',onclick:'function(){showFacets(\'usesort\')}'});
		usortspan.create('label',{'for':'usesort',textNode: 'СОРТИРОВКА РЕЗУЛЬТАТОВ ПОИСКА'});
		usortdiv.create('input',{type: 'button',id: 'usesortbutton', 'name': 'bibliobutton', value: 'Список меток для сортировки', className: 'button',onclick:'loadSort',style:{width:'350px',marginLeft:'50px',display:'none'}});
		if(usort)
		{
			take('usesort').n.checked=true;
			take('usesortbutton').n.style.display="";
		}
		else
		{
			take('usesort').n.checked=false;
			take('usesortbutton').n.style.display="none";
		}
		usortdiv.create('br',{style: {clear: 'both'}});
		
		var ublinddiv=container.create('div');
		var ublindspan=ublinddiv.create('span', {className: 'floatleft'});
		ublindspan.create('input',{type: 'checkbox',id: 'useblind', 'name': 'useblind', value: 'версия для слабовидящих', className: 'check'});
		ublindspan.create('label',{'for':'useblind',textNode: 'ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ'});
		if(ublind)
			take('useblind').n.checked=true;
		else
			take('useblind').n.checked=false;
		ublinddiv.create('br',{style: {clear: 'both'}});
		
		var bibliodiv=container.create('div');
		var bibliospan=bibliodiv.create('span', {className: 'floatleft'});
		bibliospan.create('input',{type: 'checkbox',id: 'biblio', 'name': 'biblio', value: 'поиск через библиопоиск', className: 'check',onclick:'function(){showFacets(\'biblio\')}'});
		bibliospan.create('label',{'for':'biblio',textNode: 'ПОИСК ЧЕРЕЗ БИБЛИОПОИСК'});
		//bibliodiv.create('input',{type: 'button',id: 'bibliobutton', 'name': 'bibliobutton', value: 'Редактировать список фасетов', className: 'button',onclick:'loadFacets',style:{width:'350px',marginLeft:'50px',display:'none'}});
		if(biblio)
		{
			take('biblio').n.checked=true;
			//take('bibliobutton').n.style.display="";
			showFacets('biblio');
		}
		else
		{
			take('biblio').n.checked=false;
			//take('bibliobutton').n.style.display="none";
		}
		bibliodiv.create('br',{style: {clear: 'both'}});
		
		var bibliowidgetdiv=container.create('div');
		var bibliowidgetspan=bibliowidgetdiv.create('span', {className: 'floatleft'});
		bibliowidgetspan.create('input',{type: 'checkbox',id: 'bibliowidget', 'name': 'bibliowidget', value: 'виджет библиопоиска', className: 'check',onclick:'function(){showFacets(\'bibliowidget\')}'});
		bibliowidgetspan.create('label',{'for':'biblio',textNode: 'ВИДЖЕТ БИБЛИОПОИСКА'});
		var bibliowidgetspan1=bibliowidgetspan.create('span',{id: 'bibliowidgetbutton',style:{display:'none'}});
		var bibliowidgetinput=bibliowidgetspan1.create('input',{type:'text',className:'check',id: 'bibliowidgetid', value: '',style:{margin:'0px',padding:'0px',height:'20px',width:'40px',textAlign:'center',border:'solid 1px #069'}});
		bibliowidgetspan1.create('span',{textNode: 'ID библиотеки'});
		if((typeof biblioapi == "undefined") || ((typeof biblioapi != "undefined")&&(biblioapi == "")))
			bibliowidgetinput.n.disabled=true;
		else
			bibliowidgetinput.n.disabled=false;
		if(bibliowidget)
		{
			take('bibliowidget').n.checked=true;
			take('bibliowidgetid').n.value=bibliowidgetid;
			take('bibliowidgetbutton').n.style.display="";
		}
		else
		{
			take('bibliowidget').n.checked=false;
			take('bibliowidgetid').n.value="";
			take('bibliowidgetbutton').n.style.display="none";
		}
		
		bibliowidgetdiv.create('br',{style: {clear: 'both'}});
		
		var solrdiv=container.create('div');
		var solrspan=solrdiv.create('span', {className: 'floatleft'});
		solrspan.create('input',{type: 'checkbox',id: 'solr', 'name': 'solr', value: 'фасеты solr', className: 'check',onclick:'function(){showFacets(\'solr\')}'});
		solrspan.create('label',{'for':'solr',textNode: 'ФАСЕТЫ SOLR'});
		/*solrdiv.create('input',{type: 'button',id: 'solrbutton', 'name': 'solrbutton', value: 'Редактировать список фасетов', className: 'button',onclick:'loadFacets',style:{width:'350px',marginLeft:'50px'}});*/
		if(solr)
		{
			take('solr').n.checked=true;
			//showFacets('solr');
			//take('solrbutton').n.style.display="";
		}
		else
		{
			take('solr').n.checked=false;
			//take('solrbutton').n.style.display="none";
		}
		solrdiv.create('br',{style: {clear: 'both'}});
		
		container.create('br',{style: {clear: 'both'}});
		var div1=doc.create('div');
		div1.create('input',{className:'wr',id:'wi2',name:'wi2',type:'checkbox',checked:true});
		div1.create('label',{className: 'wrapped', 'for': 'wi2', textNode: 'Настройка баз данных'});
		var container1=div1.create('div',{className:'expl',style:{border:'solid 1px #ddd', background: '#f6f6f6'}});
		var choice=container1.create('span',{id:'choice'});
		var span=choice.create('span');
		span.create('input',{'type':'radio',id:'nd','name':'choosedisplay','value':'none',onclick:'putCheck'});
		if(rezult.display=="none")
			take('nd').n.checked=true;
		span.create('label',{'for':'nd',textNode:'Не отображать в интерфейсе'});
		choice.create('br',{style: {clear: 'both'}});
		var span0=choice.create('span');
		span0.create('input',{'type':'radio',id:'rd','name':'choosedisplay','value':'radio',onclick:'putCheck'});
		if(rezult.display=="radio")
			take('rd').n.checked=true;
		span0.create('label',{'for':'rd',textNode:'Выбор баз данных путем переключения (RADIO BUTTON)'});
		choice.create('br',{style: {clear: 'both'}});
		var span1=choice.create('span');
		span1.create('input',{'type':'radio',id:'sd','name':'choosedisplay','value':'select',onclick:'putCheck'});
		if(rezult.display=="select")
			take('sd').n.checked=true;
		span1.create('label',{'for':'sd',textNode:'Выбор баз данных из списка выбора (SELECT)'});
/*----------------------*/	
		var adc=container1.create('div',{id:'search_all_bases',className:'white',style:{display:'none'}});
		var apc=adc.create('p',{style:{width:'80%'},className:'BIBL'});
		apc.create('span',{onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'База данных: '});
		var apinp=apc.create('input',{id:'sallb',className: 'bases',type: 'checkbox', name: 'MULTI', value: 'all', title:'BIBL', onclick: 'displayType'});
		var athisdb=false;
		if(typeof rezult["dbs_all"]!="undefined")
			athisdb=true;
		if(!athisdb)
			apinp.n.checked=false;
		else
			apinp.n.checked=true;
		apc.create('b',{className: 'nam1',textNode:'Все базы'});
		var aspan=apc.create('span',{className:'block',style: {width:'550px'}});
		if(!athisdb)
			aspan.n.style.display="none";
		else
			aspan.n.style.display="";
		var al='Все базы';
		if(typeof rezult.dbs_all != "undefined")
			al=rezult.dbs_all.alias;
		aspan.create('input',{className: 'alias',type: 'text', id: 'alias_all', name: 'alias_all', value: al, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		//aspan.create('input',{disabled:true, className: 'alias',type: 'text', id: 'alias_all', name: 'alias_all', value: 'Все базы', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		aspan.create('b',{className: 'titl1',textNode:'Псевдоним для отображения в поисковом интерфейсе'});
		aspan.create('br',{style:{clear:'both'}});
		aspan.create('input',{disabled:true, className: 'ind',type: 'text', id: 'ind_all', name: 'ind_all', value: 'all', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		aspan.create('b',{className: 'titl1',textNode:'ID элемента DOM (для CSS и javaScript)'});
		aspan.create('br',{style:{clear:'both'}});
/*--------------------------*/
		var acount=0;
		var iddbarr1=[];
		var iddbarr2=[];
		var iddbarr3=[];
		var iddbtmp=iddb;
		for(var arg in rezult)
		{
			if(arg.indexOf('dbs_')!=-1)
				iddbarr1.push(iddb[rezult[arg].number]);
		}
		for(var a in iddb)
		{
			if(typeof rezult['dbs_'+a] == "undefined")
				iddbarr2.push(iddb[a]);
		}
		iddbarr3=iddbarr1.concat(iddbarr2);
		for(var skey in iddbarr3)
		{
			if(typeof iddbarr3[skey] != "undefined")
			{
			var db=iddbarr3[skey];
			var labskey=db[0][0];
			var dbname=db[0][1];
			var dbtype=db[0][3];
			var dbmode=db[0][4];
			var afrub=0;
			var thisdb=false;
			if(typeof rezult["dbs_"+labskey]!="undefined")
				thisdb=true;
			if(dbtype.toUpperCase()=='BIBL')
			{
				var dc=container1.create('div',{className:'white'});
				var down=dc.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
				down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var up=dc.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
				up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var downone=dc.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
				downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var upone=dc.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
				upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var pc=dc.create('p',{style:{width:'80%'},className:dbtype});
				pc.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'База данных: '});
				var pinp=pc.create('input',{className: 'bases',type: 'checkbox', name: dbmode, value: labskey, title:dbtype, onclick: 'displayType'});
				if(thisdb)
				{
					pinp.n.checked=true;
					acount++;
				}
				else
					pinp.n.checked=false;
				pc.create('b',{className: 'nam1',textNode:dbname+' (№ '+labskey+')'});
				var aspan=pc.create('span',{className:'block',style: {width:'550px'}});
				if(!thisdb)
					aspan.n.style.display="none";
				var val=(thisdb)?rezult["dbs_"+labskey].alias:'';
				aspan.create('input',{className: 'alias',type: 'text', id: 'alias_'+labskey, name: 'alias_'+labskey, value: val, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Псевдоним для отображения в поисковом интерфейсе'});
				aspan.create('br',{style:{clear:'both'}});
				
				var ival=(thisdb)?rezult["dbs_"+labskey].dbindex:'';
				aspan.create('input',{className: 'ind',type: 'text', id: 'ind_'+labskey, name: 'ind_'+labskey, value: ival, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'ID элемента DOM (для CSS и javaScript)'});
				aspan.create('br',{style:{clear:'both'}});
				
				var outfval=(thisdb)?((typeof rezult["dbs_"+labskey].outform!="undefined")?rezult["dbs_"+labskey].outform:''):'';
				aspan.create('input',{type: 'text', id: 'outform_'+labskey, name: 'outform_'+labskey, value: outfval, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Выходная форма (короткий формат)'});
				aspan.create('br',{style:{clear:'both'}});
				
				var outfullval=(thisdb)?((typeof rezult["dbs_"+labskey].outformfull!="undefined")?rezult["dbs_"+labskey].outformfull:''):'';
				aspan.create('input',{type: 'text', id: 'outformfull_'+labskey, name: 'outformfull_'+labskey, value: outfullval, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Выходная форма (подробный вывод)'});
				aspan.create('br',{style:{clear:'both'}});
				
				var addarr=(thisdb)?((typeof rezult["dbs_"+labskey].addqueries!="undefined")?rezult["dbs_"+labskey].addqueries:new Array()):new Array();
				var addqueries=aspan.create('div',{id:'addqueries_'+labskey,style: {width:'810px',background:'white'}});
				addqueries.create('b',{className: 'block',textNode:'Дополнительные запросы:',style: {paddingLeft:'5px'}});
				if(addarr.length > 0)
				{
					for(var i=0; i<addarr.length; i++)
					{
						var addqspan=addqueries.create('div',{className:'addqueries',style: {width:'800px',padding:'0'}});
						var addnumber=(typeof addarr[i].addnumber !="undefined")?addarr[i].addnumber:'';
						var addquery=(typeof addarr[i].addquery !="undefined")?addarr[i].addquery:'';
						var addport=(typeof addarr[i].addport !="undefined")?addarr[i].addport:'';
						var addhost=(typeof addarr[i].addhost !="undefined")?addarr[i].addhost:'';
						var addhandlerpath=(typeof addarr[i].addhandlerpath !="undefined")?addarr[i].addhandlerpath:'';
						var addservice=(typeof addarr[i].addservice !="undefined")?addarr[i].addservice:'';
						var addversion=(typeof addarr[i].addversion !="undefined")?addarr[i].addversion:'';
						var addoutform=(typeof addarr[i].addoutform !="undefined")?addarr[i].addoutform:'';
						var minus=addqspan.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
						minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var plus=addqspan.create('span',{className: 'plus1',title:'Добавить',onclick: 'addElement'});
						plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var addqspan1=addqspan.create('div',{style: {width:'712px',clear:'none',padding:'5px',border:'solid 1px #ddd',background:'transparent'}});
						addqspan1.create('input',{className: 'addnumber',type: 'text', name: 'addnumber', value: addnumber, style: {margin: ' 0 10px 0 0',border: 'solid 1px #069',width:'50px'}});
						addqspan1.create('span',{textNode:'Номер БД',style:{fontWeight:'normal'}});
						addqspan1.create('input',{className: 'addquery',type: 'text', name: 'addquery', value: addquery, style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'360px'}});
						addqspan1.create('span',{textNode:'Поисковое выражение',style:{fontWeight:'normal'}});
						addqspan1.create('br');
						addqspan1.create('input',{className: 'addservice',type: 'text', name: 'addservice', value: addservice, style: {margin: '5px 10px 5px 0',border: 'solid 1px #069',width:'240px'}});
						addqspan1.create('span',{textNode:'Сервис',style:{fontWeight:'normal'}});
						addqspan1.create('input',{className: 'addversion',type: 'text', name: 'addversion', value: addversion, style: {margin: '5px 10px 5px 10px',border: 'solid 1px #069',width:'50px'}});
						addqspan1.create('span',{textNode:'Версия',style:{fontWeight:'normal'}});
						addqspan1.create('input',{className: 'addoutform',type: 'text', name: 'addoutform', value: addoutform, style: {margin: '5px 10px 5px 10px',border: 'solid 1px #069',width:'100px'}});
						addqspan1.create('span',{textNode:'Выходная форма',style:{fontWeight:'normal'}});
						addqspan1.create('br');
						addqspan1.create('input',{className: 'addport',type: 'text', name: 'addport', value: addport, style: {margin: ' 0 10px 0 0',border: 'solid 1px #069',width:'50px'}});
						addqspan1.create('span',{textNode:'Порт',style:{fontWeight:'normal'}});
						addqspan1.create('input',{className: 'addhost',type: 'text', name: 'addhost', value: addhost, style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'150px'}});
						addqspan1.create('span',{textNode:'Хост',style:{fontWeight:'normal'}});
						addqspan1.create('input',{className: 'addhandlerpath',type: 'text', name: 'addhandlerpath', value: addhandlerpath, style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'245px'}});
						addqspan1.create('span',{textNode:'Обработчик',style:{fontWeight:'normal'}});
					}
				}
				else
				{
					var addqspan=addqueries.create('div',{className:'addqueries',style: {width:'800px',padding:'0'}});
					var minus=addqspan.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement'});
					minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					var plus=addqspan.create('span',{className: 'plus1',title:'Добавить',onclick: 'addElement'});
					plus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					var addqspan1=addqspan.create('div',{style: {width:'712px',clear:'none',padding:'5px',border:'solid 1px #ddd',background:'transparent'}});
					addqspan1.create('input',{className: 'addnumber',type: 'text', name: 'addnumber', value: '', style: {margin: ' 0 10px 0 0',border: 'solid 1px #069',width:'50px'}});
					addqspan1.create('span',{textNode:'Номер БД',style:{fontWeight:'normal'}});
					addqspan1.create('input',{className: 'addquery',type: 'text', name: 'addquery', value: '', style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'360px'}});
					addqspan1.create('span',{textNode:'Поисковое выражение',style:{fontWeight:'normal'}});
					addqspan1.create('br');
					addqspan1.create('input',{className: 'addservice',type: 'text', name: 'addservice', value: '', style: {margin: '5px 10px 5px 0',border: 'solid 1px #069',width:'240px'}});
					addqspan1.create('span',{textNode:'Сервис',style:{fontWeight:'normal'}});
					addqspan1.create('input',{className: 'addversion',type: 'text', name: 'addversion', value: '', style: {margin: '5px 10px 5px 10px',border: 'solid 1px #069',width:'50px'}});
					addqspan1.create('span',{textNode:'Версия',style:{fontWeight:'normal'}});
					addqspan1.create('input',{className: 'addoutform',type: 'text', name: 'addoutform', value: '', style: {margin: '5px 10px 5px 10px',border: 'solid 1px #069',width:'100px'}});
					addqspan1.create('span',{textNode:'Выходная форма',style:{fontWeight:'normal'}});
					addqspan1.create('br');
					addqspan1.create('input',{className: 'addport',type: 'text', name: 'addport', value: '', style: {margin: '0 10px 0 0',border: 'solid 1px #069',width:'50px'}});
					addqspan1.create('span',{textNode:'Порт',style:{fontWeight:'normal'}});
					addqspan1.create('input',{className: 'addhost',type: 'text', name: 'addhost', value: '', style: {margin: '0 10px 0 15px',border: 'solid 1px #069',width:'150px'}});
					addqspan1.create('span',{textNode:'Хост',style:{fontWeight:'normal'}});
					addqspan1.create('input',{className: 'addhandlerpath',type: 'text', name: 'addhandlerpath', value: '', style: {margin: ' 0 10px 0 15px',border: 'solid 1px #069',width:'245px'}});
					addqspan1.create('span',{textNode:'Обработчик',style:{fontWeight:'normal'}});
				}
				aspan.create('input',{type: 'checkbox', id: 'always_'+labskey, name: 'always_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Всегда отображать в интерфейсе'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].always!="undefined")
						{
							if(rezult["dbs_"+labskey].always=="yes")
								take('always_'+labskey).n.checked=true;
						}
					}
				}
				
				aspan.create('input',{type: 'checkbox', id: 'loadurl_'+labskey, name: 'loadurl_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Фиксировать статистику открытия документов в свободном доступе'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].loadurl!="undefined")
						{
							if(rezult["dbs_"+labskey].loadurl=="stat")
								take('loadurl_'+labskey).n.checked=true;
						}
					}
				}
				
				aspan.create('input',{type: 'checkbox', id: 'seef_'+labskey, name: 'seef_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Иерархический вывод многочастных документов'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].seef!="undefined")
						{
							if(rezult["dbs_"+labskey].seef=="hierarchical")
								take('seef_'+labskey).n.checked=true;
						}
					}
				}
				
				aspan.create('input',{type: 'checkbox', id: 'bibcard_'+labskey, name: 'bibcard_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Выводить бибкарточку'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].bibcard!="undefined")
						{
							if(rezult["dbs_"+labskey].bibcard=="show")
								take('bibcard_'+labskey).n.checked=true;
						}
					}
				}
				
				aspan.create('input',{type: 'checkbox', id: 'rusmarc_'+labskey, name: 'rusmarc_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Выводить RUSMARC'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].rusmarc!="undefined")
						{
							if(rezult["dbs_"+labskey].rusmarc=="show")
								take('rusmarc_'+labskey).n.checked=true;
						}
					}
				}
				
				aspan.create('input',{type: 'checkbox', id: 'place_'+labskey, name: 'place_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Отображать местонахождение'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].place!="undefined")
						{
							if(rezult["dbs_"+labskey].place=="show")
								take('place_'+labskey).n.checked=true;
						}
					}
				}
				
				aspan.create('b',{className: 'titl1',textNode:'ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ',style:{display:'block'}});
				/*aspan.create('input',{type: 'checkbox', id: 'raitings_'+labskey, name: 'raitings_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Выводить рейтинг записи в результатах поиска'});
				aspan.create('br',{style:{clear:'both'}});
				aspan.create('input',{type: 'checkbox', id: 'comments_'+labskey, name: 'comments_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Выводить комментарии к записи в результатах поиска'});
				aspan.create('br',{style:{clear:'both'}});*/
				aspan.create('input',{type: 'checkbox', id: 'social_'+labskey, name: 'social_'+labskey, value: '', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Поделиться в соцсетях'});
				aspan.create('br',{style:{clear:'both'}});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey].additional!="undefined")
					{
						/*if(typeof rezult["dbs_"+labskey].additional.raitings!="undefined")
						{
							if(rezult["dbs_"+labskey].additional.raitings=="display")
								take('raitings_'+labskey).n.checked=true;
						}
						if(typeof rezult["dbs_"+labskey].additional.comments!="undefined")
						{
							if(rezult["dbs_"+labskey].additional.comments=="display")
								take('comments_'+labskey).n.checked=true;
						}*/
						if(typeof rezult["dbs_"+labskey].additional.social!="undefined")
						{
							if(rezult["dbs_"+labskey].additional.social=="display")
								take('social_'+labskey).n.checked=true;
						}
					}
				}
				
				var bval=(thisdb)?((typeof rezult["dbs_"+labskey].brokerid!="undefined")?rezult["dbs_"+labskey].brokerid:''):'';
				aspan.create('input',{className: 'brokerid',type: 'text', id: 'brokerid_'+labskey, name: 'brokerid_'+labskey, value: bval, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'BrokerId'});
				aspan.create('br',{style:{clear:'both'}});
				var fval=(thisdb)?((typeof rezult["dbs_"+labskey].fundlogin!="undefined")?rezult["dbs_"+labskey].fundlogin:''):'';
				aspan.create('input',{className: 'fundlogin',type: 'text', id: 'fundlogin_'+labskey, name: 'fundlogin_'+labskey, value: fval, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
				aspan.create('b',{className: 'titl1',textNode:'Логин'});
				aspan.create('br',{style:{clear:'both'}});
				
				aspan.create('input',{className: 'check',type: 'checkbox', id: 'rub_'+labskey, name: 'rub_'+labskey, value: 'rubricator', onclick: 'displayRubricator'});
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].rubricator!="undefined")
							take('rub_'+labskey).n.checked=true;
					}
				}
				var b=aspan.create('b',{id:'userub_'+labskey,className: 'rub',textNode:'Использовать рубрикатор'});
				b.create('br');
				
				b.create('input',{type: 'radio', id: 'rubinside_'+labskey, name: 'rub', value: 'inside'});
				b.create('label',{textNode:'В результатах поиска'});
				
				b.create('input',{type: 'radio', id: 'ruboutside_'+labskey, name: 'rub', value: 'outside'});
				b.create('label',{textNode:'На отдельной странице'});
				
				if(thisdb)
				{
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].rubricator!="undefined")
						{
							if(typeof rezult["dbs_"+labskey].rubricator.display!="undefined")
							{
								if(rezult["dbs_"+labskey].rubricator.display=='inside')
									take('rubinside_'+labskey).n.checked=true;
								if(rezult["dbs_"+labskey].rubricator.display=='outside')
									take('ruboutside_'+labskey).n.checked=true;
							}
						}
					}
				}
				
				
				var rubdiv=null;
				if(take('rub_'+labskey).n.checked)
				{
					rubdiv=aspan.create('div',{className:'white'});
					rubdiv.create('span',{id: 'nam_'+labskey, textNode: rezult["dbs_"+labskey].rubricator.name});
					rubdiv.create('br',{style:{clear:'both'}});
					rubdiv.create('p',{id: 'realrubpath_'+labskey, textNode: rezult["dbs_"+labskey].rubricator.path});
					rubdiv.create('p',{id: 'rublabel_'+labskey, textNode: rezult["dbs_"+labskey].rubricator.label});
				}
				else
				{
					rubdiv=aspan.create('div',{className:'white',style:{display:'none'}});
					rubdiv.create('input',{className: 'ind',type: 'text', id: 'nam_'+labskey, name: 'nam_'+labskey, value: '', style: {width: '250px', margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
					rubdiv.create('b',{className: 'titl1',textNode:'Название в поисковом интерфейсе'});
					var rrspan=rubdiv.create('span',{className:'block'});
					rrspan.create('input',{className: 'ind',type: 'text', id: 'fname_'+labskey, name: 'fname_'+labskey, value: '', style: {width: '215px', margin: '0px', border: 'solid 1px #069'}});
					rrspan.create('span',{textNode:'.xml'});
					rrspan.create('b',{className: 'titl1',textNode:'Имя файла рубрикатора'});
					rrspan.create('br',{style:{clear:'both'}});
					rrspan.create('input',{className: 'ind',type: 'text', id: 'rublabel_'+labskey, name: 'rublabel_'+labskey, value: '', style: {width: '40px', margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
					rrspan.create('b',{className: 'titl1',textNode:'Имя метки рубрикатора'});
					rrspan.create('br',{style:{clear:'both'}});
					rubdiv.create('input', {className: 'button', id: 'rubbut_'+labskey, value: 'Загрузить', onclick: 'function(){loadRubricator('+labskey+')}', type: 'button'});
					rubdiv.create('br',{style:{clear:'both'}});
				}
				var basecont=dc.create('div',{className:'white',id:'bc_'+labskey});
				var labscontainer=basecont.create('div',{className:'white',id:'uselab_'+labskey});
				var pl=labscontainer.create('p');
				pl.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Поисковые метки: '});
				var labels=labscontainer.create('div',{className:'labels'});
				var labspan=labels.create('span',{style:{display:'block'}});
				var slspan=labspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
				slspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				if(thisdb)
				{
					var labsobj=rezult["dbs_"+labskey].labels;
					for(lkey in labsobj)
					{
						var value=labsobj[lkey];
						var span=labels.create('div');
						var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
						down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
						up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
						downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
						upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
						minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						span.create('span',{className: 'floatleft',textNode: lkey, style:{color: '#069',fontWeight:'bold',width:'40px'}});
						
						span.create('input',{type: 'text', className: value.af, name: lkey, value: value.title, title: value.index, style: {width:'70%', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
						span.create('br',{style:{clear:'both'}});
						var icheck=span.create('input',{type: 'checkbox', name: 'invis',title:'только для поиска из подробной выходной формы', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
						span.create('b',{textNode: 'Не отображать в списке',style:{color: '#069'}});
						if(typeof value.invisible!="undefined")
							icheck.n.checked=true;
						span.create('br');
						var irole=span.create('input',{onclick: 'roleDisplay', type: 'checkbox',id: 'rolecont_'+lkey+'_'+labskey, name: 'role',title:'для библиопоиска', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
						span.create('b',{textNode: 'Роль',style:{color: '#069'}});
						var irole1=null;
						if((typeof value.role!="undefined")&&(value.role!="")&&(value.role!="N"))
						{
							irole.n.checked=true;
							irole1=span.create('span',{id: 'role_rolecont_'+lkey+'_'+labskey});
						}
						else
							irole1=span.create('span',{id: 'role_rolecont_'+lkey+'_'+labskey,style:{display:'none'}});
						irole1.create('span',{textNode: 'Выбор роли'});
						var rselect=irole1.create('select',{id: 'select_role_rolecont_'+lkey+'_'+labskey, 'name': 'select_role_rolecont', className: 'check'});
						rselect.create('option',{textNode:'',value:''});
						for(var key in roles)
						{
							if((typeof value.role!="undefined")&&(key==value.role))
								rselect.create('option',{textNode: roles[key],title:key,value:key,selected:true});
							else
								rselect.create('option',{textNode: roles[key],title:key,value:key});
						}
						span.create('br');
						var ifacet=span.create('input',{onclick: 'facetDisplay', type: 'checkbox',id: 'facetcont_'+lkey+'_'+labskey, name: 'facet',title:'Фасет', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
						span.create('b',{textNode: 'Фасет',style:{color: '#069'}});
						var ifacet1=null;
						if((typeof value.facet!="undefined")&&(value.facet!="false"))
						{
							ifacet.n.checked=true;
							ifacet1=span.create('span',{id: 'facet_facetcont_'+lkey+'_'+labskey});
						}
						else
							ifacet1=span.create('span',{id: 'facet_facetcont_'+lkey+'_'+labskey,style:{display:'none'}});
						var ifacetdisplay=ifacet1.create('input',{type: 'checkbox',id: 'facetdisplay_'+lkey+'_'+labskey, name: 'facetdisplay',title:'свернутый вид', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
						ifacet1.create('b',{textNode: 'свернутый вид',style:{color: '#069'}});
						if((typeof value.display!="undefined")&&(value.display=="wrap"))
						{
							ifacetdisplay.n.checked=true;
						}
						else
							ifacetdisplay.n.checked=false;
						var ifacetselect=ifacet1.create('select',{id: 'ifacetselect_'+lkey+'_'+labskey, name: 'ifacetselect', className: 'check'});
						if(typeof value._sort!="undefined")
						{
							if(value._sort=="count")
							{
								ifacetselect.create('option',{textNode: 'по количеству записей',value:'count',selected:true});
								ifacetselect.create('option',{textNode: 'по значению фасета',value:'index'});
							}
							else
							{
								ifacetselect.create('option',{textNode: 'по количеству записей',value:'count'});
								ifacetselect.create('option',{textNode: 'по значению фасета',value:'index',selected:true});
							}
						}
						else
						{
							ifacetselect.create('option',{textNode: 'по количеству записей',value:'count',selected:true});
							ifacetselect.create('option',{textNode: 'по значению фасета',value:'index'});
						}
						ifacet1.create('b',{textNode: 'сортировать',style:{color: '#069',margin:'0 10px'}});
						var ifacetselectorder=ifacet1.create('select',{id: 'ifacetselect_order_'+lkey+'_'+labskey, name: 'ifacetselectorder', className: 'check'});
						if(typeof value.order!="undefined")
						{
							if(value.order=="desc")
							{
								ifacetselectorder.create('option',{textNode: 'по убыванию',value:'desc',selected:true});
								ifacetselectorder.create('option',{textNode: 'по возрастанию',value:'asc'});
							}
							else
							{
								ifacetselectorder.create('option',{textNode: 'по убыванию',value:'desc'});
								ifacetselectorder.create('option',{textNode: 'по возрастанию',value:'asc',selected:true});
							}
						}
						else
						{
							ifacetselectorder.create('option',{textNode: 'по убыванию',value:'desc',selected:true});
							ifacetselectorder.create('option',{textNode: 'по возрастанию',value:'asc'});
						}
						ifacet1.create('b',{textNode: 'направление',style:{color: '#069',margin:'0 10px'}});
						//ifacet1.create('br');
						ifacet1.create('span',{textNode: 'Список имен меток-фасетов, определенных для этой метки (заполняется для реализации через ADABAS)'});
						//ifacet1.create('br');
						if((typeof value.facet!="undefined")&&(value.facet!="true")&&(value.facet!="false"))
						{
							facetval=value.facet;
							ifacet1.create('textarea',{id: 'facet_list_'+lkey+'_'+labskey, 'name': 'facet_list', value: value.facet, textNode: value.facet, style: {width:'70%', padding: '3px', margin: '3px 3px 3px 50px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'},title:'NAME1,NAME2,NAME3...'});
						}
						else
						{
							ifacet1.create('textarea',{id: 'facet_list_'+lkey+'_'+labskey, 'name': 'facet_list', value: '', textNode: '', style: {width:'70%', padding: '3px', margin: '3px 3px 3px 50px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'},title:'NAME1,NAME2,NAME3...',placeHolder:'NAME1,NAME2,NAME3...'});
						}
						span.create('br');
						var wval='';
						var wph='';
						if((typeof value.score!="undefined")&&(value.score!="1"))
							wval=value.score;
						else
							wph="1";
						var ifacetweight=span.create('textarea',{id: 'facetweight_'+lkey+'_'+labskey, name: 'facetweight',title:'от 1 до 100', value: wval, textNode: wval, style: {margin: '0 0 0 5px', border: 'solid 1px #069',width:'40px',height:'20px',overflow:'hidden'},placeHolder:wph});
						span.create('b',{textNode: 'вес (приоритет)',style:{color: '#069',margin:'0 10px'}});
					}
				}
				var limitscontainer=basecont.create('div',{className:'white',id:'uselimit_'+labskey});
				var plim=limitscontainer.create('p');
				plim.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Ограничения: '});
				var limits=limitscontainer.create('div',{className:'limits'});
				var limitspan=limits.create('span',{style:{display:'block'}});
				var lspan=limitspan.create('span',{className:'load',title:'Загрузить',onclick: 'function(){loadLimit('+labskey+',1);}', onmouseover: 'function(){setCursor(this)}'});
				lspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var smspan=limitspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
				smspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				if(thisdb)
				{
					var limitsobj=rezult["dbs_"+labskey].limits;
					for(lkey in limitsobj)
					{
						var dat=new Date();
						var today=dat.getTime();
						var value=limitsobj[lkey];
						var span=limits.create('div',{className:'white', id: 'lim'+'_'+labskey+'_1_'+today});
						var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
						down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
						up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
						downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
						upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
						minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var edit=span.create('span',{className: 'edit1',title:'Редактировать',onclick: 'editLimit', onmouseover: 'function(){setCursor(this)}'});
						edit.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						span.create('span',{textNode: value.name, style:{color: '#069',fontWeight:'bold',width:'200px'}});
						if(value.type!="fixed")
						{
							span.create('input',{type: 'hidden', name: value.label, value: value.type});
						}
						else
						{
							var sel=span.create('select',{className:lkey,name: 'limitname',style:{width:'350px'}});
							var arr=value.content;
							for(var i=0; i<arr.length; i++)
							{
								sel.create('option',{value: arr[i].value,textNode: arr[i].text});
							}
						}
					}
				}
				var filterscontainer=basecont.create('div',{className:'white',id:'usefilter_'+labskey});
				if((solr)||(biblio))
				{
					filterscontainer.n.style.display="none";
				}
				else
				{
					filterscontainer.n.style.display="";
				}
				var pfil=filterscontainer.create('p');
				pfil.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Фильтры: '});
				var filters=filterscontainer.create('div',{className:'filters'});
				var filterspan=filters.create('span',{style:{display:'block'}});
				var fspan=filterspan.create('span',{className:'load',title:'Загрузить',onclick: 'function(){loadLimit('+labskey+',2);}', onmouseover: 'function(){setCursor(this)}'});
				fspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				var sfspan=filterspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
				sfspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
				if(thisdb)
				{
					var filtersobj=rezult["dbs_"+labskey].filters;
					for(lkey in filtersobj)
					{
						var dat=new Date();
						var today=dat.getTime();
						var value=filtersobj[lkey];
						var span=filters.create('div',{className:'white', id: 'fil'+'_'+labskey+'_2_'+today});
						var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
						down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
						up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
						downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
						upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
						minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						var edit=span.create('span',{className: 'edit1',title:'Редактировать',onclick: 'editLimit', onmouseover: 'function(){setCursor(this)}'});
						edit.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
						span.create('span',{textNode: value.name,style:{color: '#069',fontWeight:'bold',width:'200px'}});
						if(value.type!="fixed")
						{
							span.create('input',{type: 'hidden', name: value.label, value: lkey});
						}
						else
						{
							var sel=span.create('select',{className:value.label,name: 'filtername',style:{width:'350px'}});
							var arr=value.content;
							for(var i=0; i<arr.length; i++)
							{
								sel.create('option',{value: arr[i].value,textNode: arr[i].text});
							}
							var elsespan=span.create('span',{style:{display:'block'}});
							if((typeof value.felse!="undefined")&&(value.felse=="yes"))
							{
								elsespan.create('input',{type: 'checkbox', name: 'putelse', value: '',checked:true});
							}
							else
							{
								elsespan.create('input',{type: 'checkbox', name: 'putelse', value: ''});
							}
							elsespan.create('span',{textNode:'добавить кнопку "еще..."'});
						}
					}
				}
			}
			else
			{
				var fundnumber=take('fundnumber').n.value;
				if(fundnumber!=labskey)
				{
					var dc=container1.create('div',{className:'white'});
					var down=dc.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
					down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					var up=dc.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
					up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					var downone=dc.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
					downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					var upone=dc.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
					upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					var pc=dc.create('p',{style:{width:'80%'},className:dbtype});
					pc.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'База данных: '});
					var pinp=pc.create('input',{className: 'bases',type: 'checkbox', name: dbmode, value: labskey, title:dbtype, onclick: 'displayType'});
					if(thisdb)
						pinp.n.checked=true;
					else
						pinp.n.checked=false;
					pc.create('b',{className: 'nam1',textNode:dbname});
					
					var aspan=pc.create('span',{className:'block',style: {width:'550px'}});
					if(!thisdb)
						aspan.n.style.display="none";
					var val=(thisdb)?rezult["dbs_"+labskey].alias:'';
					aspan.create('input',{className: 'alias',type: 'text', id: 'alias_'+labskey, name: 'alias_'+labskey, value: val, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
					aspan.create('b',{className: 'titl1',textNode:'Псевдоним для отображения в поисковом интерфейсе'});
					aspan.create('br',{style:{clear:'both'}});
					var ival=(thisdb)?rezult["dbs_"+labskey].dbindex:'';
					aspan.create('input',{className: 'ind',type: 'text', id: 'ind_'+labskey, name: 'ind_'+labskey, value: ival, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
					aspan.create('b',{className: 'titl1',textNode:'ID элемента DOM (для CSS и javaScript)'});
					aspan.create('br',{style:{clear:'both'}});
					var bval=(thisdb)?((typeof rezult["dbs_"+labskey].brokerid!="undefined")?rezult["dbs_"+labskey].brokerid:''):'';
					aspan.create('input',{className: 'brokerid',type: 'text', id: 'brokerid_'+labskey, name: 'brokerid_'+labskey, value: bval, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
					aspan.create('b',{className: 'titl1',textNode:'BrokerId'});
					aspan.create('br',{style:{clear:'both'}});
					var fval=(thisdb)?((typeof rezult["dbs_"+labskey].fundlogin!="undefined")?rezult["dbs_"+labskey].fundlogin:''):'';
					aspan.create('input',{className: 'fundlogin',type: 'text', id: 'fundlogin_'+labskey, name: 'fundlogin_'+labskey, value: fval, style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
					aspan.create('b',{className: 'titl1',textNode:'Логин'});
					aspan.create('br',{style:{clear:'both'}});
					
					
					aspan.create('b',{className: 'nam1',textNode:'Интерфейс: '});
					var aspanselect=aspan.create('select',{id: 'afrub_'+labskey, name: 'afrub_'+labskey, className: 'check'});
					aspanselect.create('option',{textNode: 'словарь',value:'af_slovar'});
					aspanselect.create('option',{textNode: 'стандартный',value:'af_standard'});
					aspanselect.create('option',{textNode: 'рубрикатор',value:'af_rubricator'});
					aspanselect.create('option',{textNode: 'иерархический рубрикатор',value:'af_mesh'});
					aspanselect.create('option',{textNode: 'рубрикатор MeSH',value:'tree_view'});
					
					
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].afrubricator!="undefined")
							afrub=parseInt(rezult["dbs_"+labskey].afrubricator,10);
					}

					aspanselect.n.options[afrub].selected=true;
					aspan.create('br',{style:{clear:'both'}});
					
					var afdisplay=aspan.create('input',{type: 'checkbox', name: 'display_'+labskey, id: 'display_'+labskey, value: labskey});
					if(typeof rezult["dbs_"+labskey]!="undefined")
					{
						if(typeof rezult["dbs_"+labskey].display!="undefined")
							afdisplay.n.checked=true;
					}
					aspan.create('b',{className: 'nam1',textNode:'Не отображать в интерфейсе '});
					aspan.create('br',{style:{clear:'both'}});
					
					var basecont=dc.create('div',{className:'white',id:'bc_'+labskey});
					var labscontainer=basecont.create('div',{className:'white',id:'uselab_'+labskey});
					var pl=labscontainer.create('p');
					pl.create('span',{className: 'wrap_', onclick: 'function(){showHide(this);}', onmouseover: 'function(){setCursor(this);}', title: 'Свернуть', textNode: 'Поисковые метки: '});
					var labels=labscontainer.create('div',{className:'labels'});
					var labspan=labels.create('span',{style:{display:'block'}});
					var slspan=labspan.create('span',{className:'plus',title:'Добавить',onclick: 'addLabel', onmouseover: 'function(){setCursor(this)}'});
					slspan.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
					if(thisdb)
					{
						var labsobj=rezult["dbs_"+labskey].labels;
						for(lkey in labsobj)
						{
							var value=labsobj[lkey];
							var span=labels.create('div');
							var down=span.create('span',{className: 'down',title:'В конец',onclick: 'ToEnd', onmouseover: 'function(){setCursor(this)}'});
							down.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
							var up=span.create('span',{className: 'up',title:'В начало',onclick: 'ToBegin', onmouseover: 'function(){setCursor(this)}'});
							up.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
							var downone=span.create('span',{className: 'downone',title:'Ниже',onclick: 'ToDownOne', onmouseover: 'function(){setCursor(this)}'});
							downone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
							var upone=span.create('span',{className: 'upone',title:'Выше',onclick: 'ToUpOne', onmouseover: 'function(){setCursor(this)}'});
							upone.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
							var minus=span.create('span',{className: 'minus',title:'Удалить',onclick: 'delElement', onmouseover: 'function(){setCursor(this)}'});
							minus.create('img',{src:'../conf/default/img/e.gif',width:'25',height:'25',alt:''});
							span.create('span',{className: 'floatleft',textNode: lkey, style:{color: '#069',fontWeight:'bold',width:'40px'}});
							span.create('input',{type: 'text', className: value.af, name: lkey, value: value.title, title: value.index, style: {width:'70%', padding: '3px', margin: '3px', border: 'solid 1px #069', color: '#333', lineHeight: '10px'}});
							span.create('br');
							var icheck=span.create('input',{type: 'checkbox', name: 'invis',title:'только для иерархических рубрикаторов', value: '', style: {margin: '0 5px 0 5px', border: 'solid 1px #069'}});
							span.create('b',{textNode: 'Не отображать в списке',style:{color: '#069'}});
							if(typeof value.invisible!="undefined")
								icheck.n.checked=true;
						}
					}
					if(take('af_int').n.checked!=false)
					{
						dc.show();
					}
					else
					{
						dc.hide();
					}
				}
			}
			}
		}
		if(acount>1)
			take('search_all_bases').show();

/*---------блок настройки сайта----------*/
		
		var div2=doc.create('div');
		div2.create('input',{className:'wr',id:'wi3',name:'wi3',type:'checkbox',checked:true});
		div2.create('label',{className: 'wrapped', 'for': 'wi3', textNode: 'Настройка сайта'});
		var container2=div2.create('div',{className:'expl',style:{border:'solid 1px #ddd', background: '#f6f6f6'}});
		var spanreg=container2.create('span');
		spanreg.create('input',{type: 'checkbox', id: 'registration', name: 'registration', value: 'registration', style: {margin: ' 0 5px 0 5px', border: 'solid 1px #069'}});
		spanreg.create('label',{'for':'registration',textNode:'Регистрация'});
		var divreg=spanreg.create('span', {id:'registrdiv',className: 'expl1',style:{marginLeft:'30px',marginTop:'10px'}});
		var tspan=divreg.create('span',{textNode:'Код и название группы '});
		tspan.create('i',{textNode:'(прописными буквами без пробела)'});
		divreg.create('input',{type:'text',className:'check',name: 'groupcode',id: 'groupcode', value: '',style:{margin:'0px 0px 10px 30px',padding:'0px 0px 0px 5px',height:'20px',width:'350px',border:'solid 1px #069'}});
		divreg.create('br');
		divreg.create('span',{textNode:'Код пункта записи'});
		divreg.create('input',{type:'text',className:'check',name: 'codepointreg',id: 'codepointreg', value: '',style:{margin:'0px 0px 10px 30px',padding:'0px 0px 0px 5px',height:'20px',width:'100px',border:'solid 1px #069'}});
		divreg.create('br');
		var nspan=divreg.create('span',{textNode:'Примечание '});
		nspan.create('i',{textNode:'(например, Internet)'});
		divreg.create('input',{type:'text',className:'check',name: 'notepointreg',id: 'notepointreg', value: '',style:{margin:'0px 0px 0px 30px',padding:'0px 0px 0px 5px',height:'20px',width:'350px',border:'solid 1px #069'}});
		divreg.create('br');
		divreg.create('input',{type: 'checkbox',id: 'payloan', 'name': 'payloan', value: 'payloan',style:{marginTop:'10px'}});
		var tlab=divreg.create('label',{'for':'payloan',textNode: 'платный абонемент ',style:{color:'#333',fontWeight:'normal'}});
		tlab.create('i',{textNode:'(коллективные/индивидуальные абоненты)'});
		if(typeof rezult.groupcode != "undefined")
		{
			take('registration').n.checked=true;
			take('groupcode').n.value=rezult.groupcode;
			take('codepointreg').n.value=rezult.codepointreg;
			if(typeof rezult.notepointreg != "undefined")
				take('notepointreg').n.value=rezult.notepointreg;				
		}
		else
		{
			take('registration').n.checked=false;
		}
		
		var spannews=div2.create('div');

/*-------конец блок настройки сайта-------*/
		
		var pb=doc.create('p',{style:{textAlign:'center'}});
		pb.create('input',{className: 'button', type:'button',onclick:'function(){nextSettings(4);}',value:'Сохранить'})
		doc.create('br');
	}
}

function findDispay()
{
	var obj=take('switch_in_base').n;
	var div=take('choice');
	var count=0;
	var bcount=0;
	var arr=take('frm').getsign('input',{className:'bases'});
	for(var i=0; i<arr.length; i++)
	{
		if(arr[i].checked)
		{
			count++;
			//if((arr[i].name=="LOCAL")&&(arr[i].title=="BIBL"))
			if(arr[i].title=="BIBL")
				bcount++;
		}
	}
	/*if(count>0)
	{
		if(count==1)
		{
			if((take('fundholders').n.checked)&&(obj.options[obj.selectedIndex].value=="in_base"))
				div.show();
			else
				div.hide();
		}
		else
		{
			div.show();
		}
	}*/
	if(bcount>1)
	{
		if(take('search_all_bases').n!=null)
			take('search_all_bases').show();
	}
	else
	{
		if(take('search_all_bases').n!=null)
		{
			take('search_all_bases').hide();
			take('sallb').n.checked=false;
		}
	}
}

function showMapDiv()
{
	var check=take('map_inp').n.checked;
	if(check)
		take('mapcontainer').n.style.display="block";
	else
		take('mapcontainer').n.style.display="none";
}

/*function showListRegions()
{
	var check=take('zoomregion').n.checked;
	if(check)
		take('listregionsdiv').n.style.display="block";
	else
	{
		take('listregionsdiv').n.style.display="none";
		take('listregions').n.checked=false;
	}
}*/

function showFl()
{
	var check=take('flt_int').n.checked;
	if(check)
		take('fltlabscontainer').show();
	else
		take('fltlabscontainer').hide();
}

function showFacets(o)
{
	var arr=take('frm').getpart(null,'div',{id:'usefilter'});
	var check=take(o).n.checked;
	if((o != "bibliowidget")&&(o != "usesort"))
	{
		for(var i=0; i<arr.length; i++)
		{
			if(check)
			{
				arr[i].style.display="none";
			}
			else
			{
				arr[i].style.display="";
				//arr[i].checked=false;
			}
		}
	}
	if(take(o+'button').n != null)
	{
		if(check)
		{
			take(o+'button').n.style.display="";
		}
		else
		{
			take(o+'button').n.style.display="none";
			take(o).n.checked=false;
		}
	}
}

function showBases()
{
	chooseAfs();
	var arr=take('frm').getsign('input',{title:'AF'});
	var check=take('af_int').n.checked;
	for(var i=0; i<arr.length; i++)
	{
		if(check)
		{
			arr[i].parentNode.parentNode.style.display="";
		}
		else
		{
			arr[i].parentNode.parentNode.style.display="none";
			arr[i].checked=false;
		}
	}
	findDispay();
}

function checkDisplay()
{
	take('fholderscontainer').n.style.display=(take('fundholders').n.checked)?"":"none";
	findDispay();
}

function roleDisplay(e)
{
	var o=getSrc(e).id;
	take('role_'+o).n.style.display=(take(o).n.checked)?"":"none";
}

function facetDisplay(e)
{
	var o=getSrc(e).id;
	take('facet_'+o).n.style.display=(take(o).n.checked)?"":"none";
}

function createLimits()
{
	take('limitscontainer').n.style.display=(take('limits').n.checked)?"":"none";
}

function checkFields()
{
	take('fieldscontainer').n.style.display=(take('expand').n.checked)?"":"none";
}

function checkAfs()
{
	take('afscontainer').n.style.display=(take('professional').n.checked)?"":"none";
}

function chooseAfs()
{
	if(take('choose_af').n.checked || take('af_int').n.checked)
	{
		take('af_int').n.checked=true;
		take('affind').show();
		take('aflabscontainer').show();
	}
	if(!take('af_int').n.checked)
	{
		take('affind').hide();
		take('aflabscontainer').hide();
	}
}

function editItem(o)
{
	var obj=o.nextSibling;
	var par=obj.parentNode;
	if(obj.nodeName.toLowerCase()!='input')
	{
		var input=take(par).create('input',{type: 'text', value: obj.innerHTML, id: obj.id, className: 'textpath'});
		par.replaceChild(input.n,obj);
	}
}

function saveSettings()
{
	/*var arg={};
	arg.target=self;
	arg.cls='loader1';
	showLayerWin('loader1win',arg);*/
	var doc=take('frm');
	var choosedisplay="";
	var check=take('af_int').n.checked;
	if(take('choice').n.style.display!="none")
	{
		var arr=take('choice').getsign('input',{type: 'radio'})
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i].checked)
			{
				choosedisplay=arr[i].value;
				break;
			}
		}
	}
	var inps=doc.getsign('input',{className: 'bases'});
	var dbs=new Array();
	var count=-1;
	var flag=false;
	for(var i=0; i<inps.length; i++)
	{
		if(inps[i].checked)
		{
			count++;
			var str="";
			var dbname=inps[i].value;
			var dbtype=inps[i].parentNode.className;
			var dbmode=inps[i].name;
			var dbalias=take('alias_'+dbname).n.value;
			var dbind=take('ind_'+dbname).n.value;
			var dbbrokerid="";
			var dblogin="";
			var outform="";
			var outformfull="";
			var loadurl="link";
			var seef="";
			var always="";
			var bibcard="";
			var rusmarc="";
			var place="";
			var raitings="";
			var comments="";
			var social="";
			var dbafrub=0;
			var dbdisplay="";
			var usort="";
			var addqarr=[];
			if(take('outform_'+dbname).n!=null)
				outform=take('outform_'+dbname).n.value;
			if(take('outformfull_'+dbname).n!=null)
				outformfull=take('outformfull_'+dbname).n.value;
			if(take('addqueries_'+dbname).n != null)
			{
				var addqueriesarr=take('addqueries_'+dbname).getsign('div',{className:'addqueries'});
				for(var j=0;j<addqueriesarr.length;j++)
				{
					var addquerystr='';
					var addnumber=take(addqueriesarr[j]).getsign('input',{className:'addnumber'})[0].value;
					var addquery=take(addqueriesarr[j]).getsign('input',{className:'addquery'})[0].value;
					var addservice=take(addqueriesarr[j]).getsign('input',{className:'addservice'})[0].value;
					var addversion=take(addqueriesarr[j]).getsign('input',{className:'addversion'})[0].value;
					var addoutform=take(addqueriesarr[j]).getsign('input',{className:'addoutform'})[0].value;
					var addport=take(addqueriesarr[j]).getsign('input',{className:'addport'})[0].value;
					var addhost=take(addqueriesarr[j]).getsign('input',{className:'addhost'})[0].value;
					var addhandlerpath=take(addqueriesarr[j]).getsign('input',{className:'addhandlerpath'})[0].value;
					if((addnumber=="")&&((addquery!="")||(addservice!="")||(addversion!="")||(addoutform!="")||(addport!="")||(addhost!="")||(addhandlerpath!="")))
					{
						alert('Вы не ввели номер БД для дополнительного запроса!');
						return;
					}
					else
					{
						if(addnumber != "")
							addquerystr+='"addnumber":"'+addnumber+'"';
					}
					if(addquery!="")
						addquerystr+=',"addquery":"'+addquery+'"';
					if(addservice!="")
						addquerystr+=',"addservice":"'+addservice+'"';
					if(addversion!="")
						addquerystr+=',"addversion":"'+addversion+'"';
					if(addoutform!="")
						addquerystr+=',"addoutform":"'+addoutform+'"';
					if(addport!="")
						addquerystr+=',"addport":"'+addport+'"';
					if(addhost!="")
						addquerystr+=',"addhost":"'+addhost+'"';
					if(addhandlerpath!="")
						addquerystr+=',"addhandlerpath":"'+addhandlerpath+'"';
					if(addquerystr!="")
						addqarr.push('{'+addquerystr+'}');
				}
			}
			if(take('always_'+dbname).n!=null)
			{
				if(take('always_'+dbname).n.checked)
					always="yes";
			}
			if(take('loadurl_'+dbname).n!=null)
			{
				if(take('loadurl_'+dbname).n.checked)
					loadurl="stat";
			}
			if(take('seef_'+dbname).n!=null)
			{
				if(take('seef_'+dbname).n.checked)
					seef="hierarchical";
			}
			if(take('bibcard_'+dbname).n!=null)
			{
				if(take('bibcard_'+dbname).n.checked)
					bibcard="show";
			}
			if(take('rusmarc_'+dbname).n!=null)
			{
				if(take('rusmarc_'+dbname).n.checked)
					rusmarc="show";
			}
			if(take('place_'+dbname).n!=null)
			{
				if(take('place_'+dbname).n.checked)
					place="show";
			}
			/*if(take('raitings_'+dbname).n!=null)
			{
				if(take('raitings_'+dbname).n.checked)
					raitings="display";
			}
			if(take('comments_'+dbname).n!=null)
			{
				if(take('comments_'+dbname).n.checked)
					comments="display";
			}*/
			if(take('social_'+dbname).n!=null)
			{
				if(take('social_'+dbname).n.checked)
					social="display";
			}
			if(take('brokerid_'+dbname).n!=null)
				dbbrokerid=take('brokerid_'+dbname).n.value;
			if(take('fundlogin_'+dbname).n!=null)
				dblogin=take('fundlogin_'+dbname).n.value;
			if(take('afrub_'+dbname).n!=null)
				dbafrub=take('afrub_'+dbname).n.selectedIndex;
			if(take('display_'+dbname).n!=null)
			{
				if(take('display_'+dbname).n.checked)
					dbdisplay="hidden";
			}
			str+='"dbs_'+dbname+'":{"number":"'+dbname+'","type":"'+dbtype+'","mode":"'+dbmode+'","alias":"'+dbalias+'","dbindex":"'+dbind+'"';
			if((dbalias=="")||(dbind==""))
			{
				alert("Введите псевдоним и ID базы данных.");
				return;
			}
			if(outform!="")
				str+=',"outform":"'+outform+'"';
			if(outformfull!="")
				str+=',"outformfull":"'+outformfull+'"';
			if(seef!="")
				str+=',"seef":"'+seef+'"';
			if(always!="")
				str+=',"always":"'+always+'"';
			if(bibcard!="")
				str+=',"bibcard":"'+bibcard+'"';
			if(rusmarc!="")
				str+=',"rusmarc":"'+rusmarc+'"';
			if(place!="")
				str+=',"place":"'+place+'"';
			if((raitings!="")||(comments!="")||(social!=""))
			{
				str+=',"additional":{"raitings":"'+raitings+'","comments":"'+comments+'","social":"'+social+'"}';
			}
			if(dbbrokerid!="")
				str+=',"brokerid":"'+dbbrokerid+'"';
			if(dblogin!="")
				str+=',"fundlogin":"'+dblogin+'"';
			if(addqarr.length && (addqarr.length > 0))
			{
				str+=',"addqueries":[';
				str+=addqarr.join(',');
				str+=']';
			}
			if(dbtype=='BIBL')
			{
				if(dbname!="all")
				{
					str+=',"loadurl":"'+loadurl+'"';
					flag=true;
					var userub=take('rub_'+dbname).n.checked;
					var useruboutside=take('rubinside_'+dbname).n.checked || take('ruboutside_'+dbname).n.checked;
					if(userub)
					{
						if(take('nam_'+dbname).n.nodeName.toLowerCase()=='input')
						{
							alert("Загрузите рубрикатор!");
							return;
						}
						else
						{
							str+=',"rubricator":{"name":"'+take('nam_'+dbname).n.innerHTML+'","path":"'+take('realrubpath_'+dbname).n.innerHTML+'","label":"'+take('rublabel_'+dbname).n.innerHTML+'"';
							if(useruboutside)
							{
								if(take('rubinside_'+dbname).n.checked)
									str+=',"display":"'+take('rubinside_'+dbname).n.value+'"';
								else
									str+=',"display":"'+take('ruboutside_'+dbname).n.value+'"';									
							}
							str+='}';
						}
					}
					var labs=take('uselab_'+dbname).getsign('input',{type:'text'
					});
					if(labs.length>0)
					{
						str+=',"labels":{';
						for(var j=0; j<labs.length; j++)
						{
							str+='"'+labs[j].name+'":{"title":"'+labs[j].value+'","index":"'+labs[j].title+'","af":"'+labs[j].className+'"';
							if((labs[j].nextSibling)&&(labs[j].nextSibling.nextSibling)&&(labs[j].nextSibling.nextSibling.nodeName.toLowerCase()=='input'))
							{
								if(labs[j].nextSibling.nextSibling.checked)
									str+=',"invisible":"Y"';
							}
							if(take('rolecont_'+labs[j].name+'_'+dbname).n.checked)
							{
								str+=',"role":"'+take('select_role_rolecont_'+labs[j].name+'_'+dbname).n.options[take('select_role_rolecont_'+labs[j].name+'_'+dbname).n.selectedIndex].value+'"';
							}
							else
							{
								str+=',"role":"N"';
							}
							if(take('facetcont_'+labs[j].name+'_'+dbname).n.checked)
							{
								if(take('facet_list_'+labs[j].name+'_'+dbname).n.value=="")
									str+=',"facet":"true"';
								else
									str+=',"facet":"'+take('facet_list_'+labs[j].name+'_'+dbname).n.value+'"';
								if(take('facetdisplay_'+labs[j].name+'_'+dbname).n.checked)
									str+=',"display":"wrap"';
								else
									str+=',"display":"unwrap"';
								str+=',"_sort":"'+take('ifacetselect_'+labs[j].name+'_'+dbname).n.options[take('ifacetselect_'+labs[j].name+'_'+dbname).n.selectedIndex].value+'"';
								str+=',"order":"'+take('ifacetselect_order_'+labs[j].name+'_'+dbname).n.options[take('ifacetselect_order_'+labs[j].name+'_'+dbname).n.selectedIndex].value+'"';
							}
							else
							{
								str+=',"facet":"false"';
								str+=',"display":"false"';
								str+=',"_sort":"count"';
								str+=',"order":"desc"';
							}
							if(take('facetweight_'+labs[j].name+'_'+dbname).n.value != "")
								str+=',"score":"'+take('facetweight_'+labs[j].name+'_'+dbname).n.value+'"';
							else
								str+=',"score":"1"';
							str+='}';
							if(j!=labs.length-1)
								str+=',';
						}
						str+='}';
					}
					else
					{
						alert("Добавьте поисковые метки!");
						return;
					}
					var limits=take('uselimit_'+dbname).getsign('div',{className:'white'
					});
					if(limits.length>0)
					{
						str+=',"limits":{';
						for(var j=0; j<limits.length; j++)
						{
							var cNode=limits[j].lastChild;
							if(cNode.nodeName.toLowerCase()=='input')
							{
								str+='"'+j+'":{"type":"'+cNode.value+'","name":"'+cNode.previousSibling.innerHTML+'","label":"'+cNode.name+'"}';
							}
							else
							{
								str+='"'+j+'":{"type":"fixed","name":"'+cNode.previousSibling.innerHTML+'","content":[';
								for(var k=0;k<cNode.options.length;k++)
								{
									str+='{"value":"'+cNode.options[k].value+'","text":"'+cNode.options[k].text+'"}';
									if(k!=cNode.options.length-1)
										str+=',';
								}
								str+=']}';
							}
							if(j!=limits.length-1)
								str+=',';
						}
						str+='}';
					}
					if(take('usefilter_'+dbname).n.style.display!="none")
					{
						var filters=take('usefilter_'+dbname).getsign('div',{className:'white'
						});
						if(filters.length>0)
						{
							str+=',"filters":{';
							for(var j=0; j<filters.length; j++)
							{
								var cNode=null;
								if(filters[j].lastChild.nodeName.toLowerCase()=='input')
									cNode=filters[j].lastChild;
								else
									cNode=filters[j].lastChild.previousSibling;
								if(cNode.nodeName.toLowerCase()=='input')
								{
									str+='"'+j+'":{"type":"dinamic","name":"'+cNode.previousSibling.innerHTML+'","label":"'+cNode.name+'"}';
								}
								else
								{
									str+='"'+j+'":{"type":"fixed","name":"'+cNode.previousSibling.innerHTML+'","label":"'+cNode.className+'","content":[';
									for(var k=0;k<cNode.options.length;k++)
									{
										str+='{"value":"'+cNode.options[k].value+'","text":"'+cNode.options[k].text+'"}';
										if(k!=cNode.options.length-1)
											str+=',';
									}
									str+=']';
									if(cNode.parentNode.lastChild.firstChild.checked==true)
										str+=',"felse":"yes"';
									else
										str+=',"felse":"no"';
									str+='}';
								}
								if(j!=filters.length-1)
									str+=',';
							}
							str+='}';
						}
					}					
				}
			}
			else
			{
				str+=',"afrubricator":"'+dbafrub+'"';
				if(dbdisplay!="")
					str+=',"display":"'+dbdisplay+'"';
				var labs=take('uselab_'+dbname).getsign('input',{type:'text'
				});
				if(labs.length>0)
				{
					str+=',"labels":{';
					for(var j=0; j<labs.length; j++)
					{
						/*str+='"'+labs[j].name+'":{"title":"'+labs[j].value+'","index":"'+labs[j].title+'","af":"'+labs[j].className+'"}';*/
						str+='"'+labs[j].name+'":{"title":"'+labs[j].value+'","index":"'+labs[j].title+'","af":"'+labs[j].className+'"';
						if((labs[j].nextSibling)&&(labs[j].nextSibling.nextSibling)&&(labs[j].nextSibling.nextSibling.nodeName.toLowerCase()=='input'))
						{
							if(labs[j].nextSibling.nextSibling.checked)
								str+=',"invisible":"Y"';
						}
						str+='}';
						if(j!=labs.length-1)
							str+=',';
					}
					str+='}';
				}
				else
				{
					alert("Добавьте поисковые метки!");
					return;
				}
			}
			str+='}';
			dbs[count]=str;
		}
	}
	if((take('simple').n.checked==false)&&(take('expand').n.checked==false)&&(take('professional').n.checked==false))
	{
		alert('Выберите хотя бы один интерфейс!');
		return;
	}
	if((dbs.length==0)||(!flag))
	{
		alert('Выберите хотя бы одну базу данных!');
		return;
	}
	var sintarr=[];
	if(take('simple').n.checked)
	{
		sintarr.push('{"id":"simple","title":"Простой поиск","outform":"'+take('shotform').n.value+'","outformfull":"'+take('fullform').n.value+'"}');
	}
	if(take('expand').n.checked)
	{
		var qw="3";
		if(take('quantity').n.value!="")
			qw=take('quantity').n.value;
		sintarr.push('{"id":"expand","title":"Расширенный поиск","quantity":"'+qw+'","tie":"'+take('tie').n.checked+'"}');
	}
	if(take('professional').n.checked)
	{
		var choose_af="false";
		if(take('choose_af').n.checked)
		{
			choose_af="true";
		}
		sintarr.push('{"id":"professional","title":"Профессиональный поиск","choose_af":"'+choose_af+'"}');
	}
	if(take('fundholders').n.checked)
	{
		var sib=take('switch_in_base').n.options[take('switch_in_base').n.selectedIndex].value;
		var fundnumber=take('fundnumber').n.value;
		var fundbroker=take('fundbroker').n.value;
		var searchfundslabel=take('searchfundslabel').n.value;
		var fundslabel=take('fundslabel').n.value;
		var fundalias=take('fundalias').n.value;
		if(fundalias=="")
			fundalias="Библиотеки";
		var fundlogin=take('fundlogin').n.value;
		var fndstr='{"id":"fundholders","title":"'+fundalias+'","switch_in_base":"'+sib+'","fundnumber":"'+fundnumber+'"';
		var fstr='"dbs_'+fundnumber+'":{"number":"'+fundnumber+'","type":"AF","mode":"LOCAL","dbindex":"fundholders","alias":"'+fundalias+'","switch_in_base":"'+sib+'"';
		if((searchfundslabel!="")&&(searchfundslabel!="undefined"))
		{
			fndstr+=',"bibl_search_label":"'+searchfundslabel+'"';
			fstr+=',"bibl_search_label":"'+searchfundslabel+'"';
		}
		if((fundslabel!="")&&(fundslabel!="undefined"))
		{
			fndstr+=',"search_label":"'+fundslabel+'"';
			fstr+=',"search_label":"'+fundslabel+'"';
		}
		if((fundbroker!="")&&(fundbroker!="undefined"))
		{
			fndstr+=',"fundbroker":"'+fundbroker+'"';
			fstr+=',"brokerid":"'+fundbroker+'"';
		}
		if(fundalias!="")
		{
			fndstr+=',"fundalias":"'+fundalias+'"';
		}
		if((fundlogin!="")&&(fundlogin!="undefined"))
		{
			fndstr+=',"fundlogin":"'+fundlogin+'"';
			fstr+=',"fundlogin":"'+fundlogin+'"';
		}
		fstr+='}';
		fndstr+='}';
		sintarr.push(fndstr);
		dbs[++count]=fstr;
	}
	if(take('af_int').n.checked)
	{
		var affindbroker=take('affindbroker').n.value;
		var affindlogin=take('affindlogin').n.value;
		var prefind="";
		if(take('prefind').n.checked)
			prefind='"prefind":"true",';
		sintarr.push('{"id":"authority","label":"'+take('aflabname').n.value+'","title":"'+take('aflabalias').n.value+'",'+prefind+'"affindbroker":"'+affindbroker+'","affindlogin":"'+affindlogin+'"}');
	}
	if(take('map_inp').n.checked)
	{
		if((take('smapwidth').n.value=='')||(take('smapheight').n.value==''))
		{
			alert('Введите размеры карты!');
			return;
		}
		else if(take('iscords').n==null)
		{
			alert('Добавьте/загрузите координаты!');
			return;
		}
		else
		{
			var mapstr='{"id":"mapsearch","mapwidth":"'+take('smapwidth').n.value+'","mapheight":'+take('smapheight').n.value+'"';
			if(take('listregions').n.checked)
				mapstr+=',"listregions":"yes"';
			mapstr+=',"cordspath":"'+take('iscords').n.value+'"';
			mapstr+='}';
			sintarr.push(mapstr);
		}
	}
	/*if(take('flt_int').n.checked)
	{
		sintarr.push('{"id":"fulltext","base":"'+take('fltlabname').n.value+'","title":"Поиск по полному тексту"}');
	}*/
	if(take('uselight').n.checked)
	{
		sintarr.push('{"id":"uselight","value":"yes","title":"Подсветка"}');
	}
	if(take('usesort').n.checked)
	{
		sintarr.push('{"id":"usesort","value":"yes","title":"Сортировка результатов поиска"}');
	}
	if(take('useblind').n.checked)
	{
		sintarr.push('{"id":"blind","value":"yes","title":"Версия для слабовидящих"}');
	}
	if(take('biblio').n.checked)
	{
		sintarr.push('{"id":"biblio","value":"yes","title":"Поиск через Библиопоиск"}');
	}
	if(take('bibliowidget').n.checked)
	{
		if(take('bibliowidgetid').n.value == "")
		{
			alert('Не указан ID библиотеки!');
			return;
		}
		else
		{
			sintarr.push('{"id":"bibliowidget","value":"'+take('bibliowidgetid').n.value+'","title":"Виджет Библиопоиска"}');
		}
	}
	if(take('solr').n.checked)
	{
		sintarr.push('{"id":"solr","value":"yes","title":"фасеты solr"}');
	}
	
	var qstr='{"display":"'+choosedisplay+'",';
	
	if(take('registration').n.checked)
	{
		if((take('groupcode').n.value=="") || (take('codepointreg').n.value==""))
		{
			alert('Введите данные для регистрации!');
			return;
		}
		else
		{
			qstr+='"groupcode":"'+take('groupcode').n.value+'",';
			qstr+='"codepointreg":"'+take('codepointreg').n.value+'",';
			if(take('notepointreg').n.value!="")
				qstr+='"notepointreg":"'+take('notepointreg').n.value+'",';
			if(take('payloan').n.checked)
				qstr+='"payloan":"'+take('payloan').n.value+'",';
		}
	}
	
	qstr+='"switchinterface":[';

	qstr+=sintarr.join(',');
	qstr+='],';
	for(var i=0; i<dbs.length; i++)
	{
		qstr+=dbs[i];
		if(i!=dbs.length-1)
			qstr+=',';
	}
	qstr+='}';
	showProgressBar();
	var gArr=new Array();
	gArr.push(["jsontext",qstr]);
	callToRCP(gArr,self,'conf.php');
}

function showEditor()
{
	showProgressBar();
	var gArr=new Array();
	gArr.push(["writesite","6"]);
	callToRCP(gArr,self,'conf.php');
}

function nextEditor(step)
{
	switch(step)
	{
		case 1: savePath();
		break;
		case 2: showInterface();
		break;
		case 3: iddbSettings();
		break;
		case 4: saveSettings();
		break;
		case 5: createInterface();
		break;
		case 6: showEditor();
		break;
		default:
		break;
	}
}

function showProgressBar()
{
	var arg={};
	arg.target=self;
	arg.cls='loader1';
	showLayerWin('loader1win',arg);
}

/*------------------------- конец настройка проекта ------------------*/
