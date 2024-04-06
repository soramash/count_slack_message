# count_slack_message
daily checker for counting the number of your slack messages.

(日本語は後半にあります)

This script operates on Google Apps Script.

It aggregates how many messages I posted on Slack the day before and notifies me on Slack. It also comments on whether the number of messages was higher or lower compared to the day before that. I created this script because I wanted to understand the following:

1. On average, how many messages do I actually post on Slack?
2. Is there a difference in how tired I feel at the end of the day between days when I post more messages and days when I post fewer?
3. I think that days with more posts might mean I had a lot of monologues or increased communication with colleagues and managers. In other words, it could be considered a day with more output.
4. Days with fewer posts might mean I was able to focus and work on other things, possibly indicating a day with more input. However, this could also include days when I was sick in bed or traveling, so it requires case-by-case judgment.


Just as some people might use X (formerly Twitter) excessively, I hope this can serve as a deterrent to prevent myself from becoming a Slack addict.

-------

<< 日本語 >>
本スクリプトは Google Apps Script で動作します。

前日に自分がSlack でどのくらいメッセージをポストしたかを集計して、Slack に通知します。
その前の日と比較して、多かったか、少なかったかもコメントします。
それによって、以下のことを知りたかったのがこのスクリプトを作った理由です。

1. 実際に自分は平均でどのくらい Slack にメッセージを投稿しているか
2. 自分からの投稿が多い日と少ない日で1日の終わりに感じる疲れ方に差はあるか
3. 投稿が多い日は、自分の独り言、または同僚やマネージャとのコミュニケーションが多かったことを意味すると考えています。言い換えるとアウトプットが多かった人いえるかもしれません
4. 投稿が少ない日は他のことに集中して作業をすることができたことを意味すると考えています。インプットができた日ということができる時もありますが、風邪で寝込んだり、旅行中なども該当するので都度判断が必要です。

X (旧Twitter) 廃人同様、自分が Slack 廃人にならないために一定の抑止力になればと思います。

