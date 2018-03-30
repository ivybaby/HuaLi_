
/**判断是否为空*/
function isEmpty(obj,messageObj,messageName,isWarning){
    if(isWarning){
        obj.removeClass('hua-input-warning');
    }
    messageObj.text('');
    var temp=0;
    obj.each(function(i){
        if($(this).val().length===0){
            if(isWarning){
                $(this).addClass('hua-input-warning');
            }
            messageObj.text($(this).attr("placeholder")+messageName);
            return false;
        }else{
            temp++;
        }
    })
    if(temp===obj.length){
        return true;
    }
}

/*  ajax  */
function getAjax(url,objData,successBack,failBack,completeBack){
    $.ajax({
        url : url,
        type : "POST",
        data :objData,
        dataType : "json",
        success : function(res) {
            successBack(res);
        },
        error:function(msg){
            failBack(msg);
        },
        complete:function(){
            completeBack();
        }
    })
}


$('.hua-input-part .hua-input').on('blur',function(e){
    $(this).val($(this).val().trim());
})
/*  登录 */

// storage.setItem('messageUpdateTime',getNowDate(new Date()));

function isLogin(norObj,yesObj){

    norObj.addClass("hua-hidden");
    yesObj.addClass("hua-hidden");
    var storage= window.localStorage;//缓存
    storage = storage ? storage : [];
    var oUser=storage.getItem('ss');
    oUser=(oUser==(null||undefined))?'':oUser;
    if(oUser.length>0){//说明登录过了
        yesObj.removeClass("hua-hidden");
    }else{//未登录
        norObj.removeClass("hua-hidden");
    }
}

var verifyCode = new GVerify("v_container");
function getLogin(submitBtn,inputObj,showObj){
    var storage= window.localStorage;//缓存
    storage = storage ? storage : [];
    submitBtn.on('click',function(e) {
        
        var isTrue=isEmpty(inputObj,showObj,'不能为空',false);

        var oForm=$(this).closest('form');
        //判断是否为空
        if(isTrue){
            var res = verifyCode.validate(document.getElementById("code_input").value);
            if(res){
                //正确
                // console.log('验证码正确');
                getAjax(url,{

                },function (res) {
                    storage.setItem('userName',res.name);
                    storage.setItem('passwaord',res.pwd);
                    oForm.addClass("hua-hidden");
                    oForm.siblings(".hua-login-img").removeClass("hua-hidden");
                },function (msg) {
                    showObj.text('msg');
                });

            }else{
                showObj.text('验证码错误');
                return;
            }
        }
    })
}
