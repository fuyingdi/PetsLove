api:  
```
1.index页面显示 
/post/getPostInfoList  
用户端：
    {
        page(number) 当前页数
        query_time(timestamp) 查询时间
    }
服务器：  
    [  
        （以下对象共五个）
        {
        post_id  
        avatar(url)帖子创建者的头像  
        nickname(text)  
        outline(text)长度在80个字符之内  
        picture(array)数组内容只有纯粹的String格式的url，照片不超过3张  
        visitor_number(number)  
        publish_time
        }
    ]  


2. showPost页面显示
用户端：
/post/getPost
    {
        post_id
        type:1
    }
/post/getFloorList
    {
        post_id
        query_time(timestamp)第一次查询的时间，如果向上划看更多帖子则用同一个timestamp,如果向下滑刷新则发送新的timestamp
        page(number)查看的第几页，假设每页5条回复
        type:1
    }

服务端：
    用户端访问getPost时
    第一个response传递帖子信息
    {
        post_id
        account
        publish_time    发布时间
        type    帖子类型
        avatar(url) 帖子创建者的头像
        nickname(text)
        title(text)
        content(text)
        picture(array)同postInfo
        liked(0 1)
        collected(0 1)
        like_number()
        visible_flag
        visitor_number
    }
    用户端访问getFloorList时
    第二个response传递五条回复信息
    [
        以下对象重复五次
        {
            post_id
            cite_id
            floor_id
            publish_time
            account
            avatar(url)
            nickname(text)
            cite_content(text)    引用内容
            content(text)    回复内容
        }
    ]
    
3.回复
/post/addFloor
用户端：
    {
        post_id
        cite_id(回复的楼层的id)    如果回复的是帖子则为空
        content(text)回复的内容
        type:1
    }

4.上传帖子
/post/addPost
用户端：
待“发帖”键按下后，先发送图片（递归到图片发送完毕），发送标题和文字。
    {
        picture   好几张递归
        title
        content
    }
服务端：


5.上传转让帖
/market/addTrade
待“发帖”键按下后，先发送图片（递归到图片发送完毕），发送其他信息
用户端：
    {
        pet_name
        content
        bleed(text) 转让的宠物品种
        prospective_price 预期价格
        picture 好几张递归
    }

6.market页面显示 
/post/getTradeInfoList  
用户端：
    {
        page(number) 当前页数
        query_time(timestamp) 查询时间
        type:2
    }
服务器：  
    [  
        （以下对象共五个）
        {
        trade_id    
        bleed
        pet_name
        prospective_price  
        picture(url)只拿一张  
        }
    ]  

7.showTrade页面显示
交易帖细节页面和帖子页面不同，交易帖细节页面只展示交易帖，而无回复
用户端：  
获取交易帖信息
/market/getTradeItem
    {
        trade_id
        type:2
    }

服务器端：
    {
        account
        avatar(url)
        nickname(text)
        type 帖子类型
        pet_name
        content
        prospective_price
        bleed
        picture(array)
    }

8.加载图片
/album/getAlbum
用户端
    {
        page；
    }
    

9.帖子点赞
用户端：
/post/likePost
/post/cancelLikePost
    {
        post_id
    }

服务器端：
    {
        type(成功返回"success"，失败返回"fail")
    }


```