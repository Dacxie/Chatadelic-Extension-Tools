// ==UserScript==
// @name        Chatadelic Extension Tools
// @namespace   https://github.com/Dacxie/Chatadelic-Extension-Tools
// @include     http://chatadelic.net/frame.php?chat=*
// @include     https://chatadelic.net/frame.php?chat=*
// @version     1.0.2
// @grant		none
// ==/UserScript==

$(function() {
	ce_v_saved_style = null;
	ce_v_version = '1.0.2';
	ce_v_chat = window.location.href.substr(window.location.href.indexOf('chat=') + 5);
	if(localStorage['ce_settings_' + ce_v_chat] && JSON.parse(localStorage['ce_settings_' + ce_v_chat]) && JSON.parse(localStorage['ce_settings_' + ce_v_chat]).version == ce_v_version) {
		ce_v_settings = JSON.parse(localStorage['ce_settings_' + ce_v_chat]);
	} else {
		ce_v_settings = {
			style_disabled: false,
			color_disabled: false,
			headpics_disabled: false,
			smileys_disabled: false,
			bypass_enabled: false,
			nsfw_enabled: false,
			version: ce_v_version
		};
	}
	ce_v_btn_icons = {
		style: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACc0lEQVR42o3T2U4TURwG8HkFHsFLCJbOUCikLF1YEm6UiCyylS6SeCMuiKxKKaUFpFBlTaAaKBgMYgJSk7JIy1IUhEohLrjg8hyfZxljr9RJfjOZL+f/5UxyRjj6WYu/if64jCMiKjv8bsXhN04QhDghNnhLnVoRObUg8pWyMgfUFwsOPluwL3vzyUwLzgg8MLOAOeH2TkzY+8jtfvitBrvva/BaRgoUQmzw6p2ReREqQaMtByqVClq9GrOLhdg5rkb42IjwURXC0SpsE6RAEmKD7Wg1tg8roSNDxtosLIccCAQ7EQib4d86j/n1AjxZycfsch5mA3m0IFnYjFRiI1KOjQOqAqH9CugMGhitmVhYL8TcSgGm/bnw+XPgW8rB1HNuctHAC9b3LoHZLcNL2cTUFaSolRClBBRXSBh5rIV3Xo8J6qkO49Scjhes7ZRgNUyQpz9YCO8zPaYXL2IpWI9uTyWUYgIulImkJBsjM9kYJoamsxhWsLxVhMBmEXwL+Rj0ZWFwKhMPqMlM3CcM+WeRVyDB8ygDAw+5fi+l4QVLa+cwNqODe0LD9I1ryPYTkJGdCH1uIuLj49HlLkHPaDrTPZIOFzWczgt6x/4EzuE0OIfSyEA5HH2lsPcWY2DUgntjubB71EzHQCpj60/lBSzo54HNnYp2dwpcQwa4Bg1wEg6PFm09Kqa1m2txJTOsIDZodhJdyWjqktDkkNDYKeE2ZZfQYBfR0CHiFmUTUd8u8oNEX3igZG7eVeLGHSoJ19uI1iRco1qSUNeiQF2zAlepJgU/yuTSEqWEiTD/B5O8Xst+JvmmYNuh3/RvkryezsX9AmH7JclhiglyAAAAAElFTkSuQmCC',
		style_enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACWElEQVR42o3T6U8TQRgG8P0uh0UoChZYitAu22u7UKAFylnaclukiFQoESoCYkIAoxRjBGpiERO5FLm9/srHmXkb7Sd1k9++2SczT3aTWclx9RN/Y79kxPzxx8V32BhJkgxSdkC+wXbOnNFUz76SU+4K6knGl0teIEv0QEHtccbnC/KJObqAcnQO5ZA7g3JwCmWfO+EFdik7sO4dC8rrFBxj49B1HW6vF8ryc1h2D2H5cMTmAbMPy84+L9Ck7MCS3kNN+iP0Ji+coT4kTi8xe3KOhlQaFSvrMC0uw5RYZBZgmp3nBW6pOrWL6tR7VG+nmR1Ubb2Dx9cMZzAMefklyuaf4fZ0AqVxbhalUzNk8hEVmF9tw7zBbcGcfIPK5CYiL9Zh1zTUqCoqfS0oiU6g5MEkbo0z9x+SsRgVyGsbkNeSkFeTKHu6Iha5Hi8guvkWwcQclTR6cXNkDMWRKLk7iuLhUSooX1pF+dIKSmJxFt5D8dAIjINcBMaBCMyaG0q9B8b+YRj7hlDE9Q4KoqB05gmMrLEoPEBC/bij2lDlcMLsdMFqtcIfm0JhIITC7hBudAVJZw8VFHSFfgdCRwDdU9Noj02idXwCA3PzqOwfQoG/AwWtHTC0tsPQwjS3UQEFbSIwNPth8PkhB3sh94RREQjD1BnA9UYfafAK+Z4mQRRkB/n1jcivayC6B3l6PfLcjFZHXLqQ63QzGh2kPJebAodG7C7GiVwb50COaie1NuQonIocq4pr1lo6yuzyM1Emzkz/h3hmvV/8TJmbXbwO/6Z/0zLr+T7DLz86oDnBln1rAAAAAElFTkSuQmCC',
		color: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcElEQVR42o3T2U4TUQAG4HkFHsFLEi3t1E5p2LpgSbhBDAjKItBWLsWVHUsLtlBo2ZdGFsUKFhQ3lkiV3RYFbaUYF1xweY7fs9TYK3WSbybz58x/zknOCHs/K/E30R9nsUdEY3a/W7D7jRMEIUGID95QBxZEDsyIfKUsTJj6Ykb4sxmvY159MtGCQwIPTCxg9rmd/QrsfOS2P/xWju335XgZQwpkQnzw4l0ZsxEpRq0tE1qdGiqVClq9GvOrJxF6W4bQXilC0VIECVIgCvFBMHoGwd0SWF1G6AwauAdMCKw7MLtYiydbRZhdzcb00yz4A0b4l4y0QClsRkrIjEXYCFPFWFzPhyRJWAm2YzNSg4drhZgJnIBvIRO++UzcmuMmHht4werOaTDbp7BCzMwdh1wux/RSDsYf6Jmx+8SsHqPUPR1GqLs6XrC8VYBnIYI8F9Zy0dZnRGJiInon0uH1azF8J4MZmiImMzBIDNxOZ1hB4Hkeljbz4HuUhX5fOq77syGKR5BbICclaei9mYaeG6lM9zjXNUal8IL55Rx4J3XwjKYw7pEU9I+aodbIkJpxGPpjXJNLgmtYg/YhDdqoQQ0v6PD+CZyDyXAOJKPTS/Y6VYnWzkLYXfmMzZOKlh417N0SY+uSeAELunhg80ho9qhgdatgc5OyfgOcfQY4evWwdqjR2H6UaWhTMqwgPqh3Eg4l6hwi6q6JqG0VUUO1iKhuUaDarsAVyqbA5WYFP0j0hQdy5pJVjotXqSRcaCIak3CeakhCVYMMVfUynKPqZPwok0tLFBIVhOk/VMTGa9nPFLvJ2HLonv5NjI2n3yX8AvrGJ5Ry6eA3AAAAAElFTkSuQmCC',
		color_enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSElEQVR42o3T2U8TURgF8HmXxSJLhSA0JaXTZaYLLUvBsqNlFRAotSw1AtFalhAgISmYiPDCYpRClaUsiv6Vx+/er9E+qZP85mZO7j0zNzOj6Lc/8TfaDZHjjz+u7+AkiqIYlNyAfYfzimR4dGS+sUvhFo6LrPMbUWBS+IID+1nW12v2haSvYUtfwXYqZGA7uYQtJVyIAk3JDdTjM7Z/DD0cgTcQgM/ng7cpADW5A+vHNKxHJyQF60FKFHiU3MBKC2v3P8MZicLX3IKh5VXEM7eIHn6Ctr2DysQqKhcS5C0q5+OiwKtY9o5g2TuEZXefHKBm8x38fj9e39xh4PQc+tomHIkVVMQWyDwqZufYzCsuMG/vwrwlfIA5+R6W+DJcLhdq4isoj8bYi1kyg4cRMjnNwlNcYNrYgmkjCdN6Eo8W16BORKCqKoyjEzCORcgkjM+FMMook0bGUTY8zgVVS+uoWlpD+VSMwjHURmdh1zSY6htROjhKRlA6MMz6n6FE6BuSZEHF3BuUUmNJ7yALDaA/vgib2Iauw+xySyXtXSjuDuFB11PW+YQLirpCvwOpowdV/UPoSyyjfWoaQXojQnlnD4qCHTAE22F4TFrauICDNhkYWlphaBaCKKasuqeXhFDdTTeg7H5DQCqsb5JkQW5Q6G9Eoa+B1dWjoM6PAi/x+Ji7Tsp3eYmHP6QCt5cD3cM0N3Eh3ynoyHNozO5Enk1wIE914J5q50+ZjlYyQWLk5X+IZee3yp8pe9Lk44g9/ZsnO1+sM/wCq4+gwSXZCi0AAAAASUVORK5CYII=',
		headpic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACd0lEQVR42o3Ta09SYQAH8PMV/Ai9dC6EYwgoKqgTZi9cZcusFBC0XmlXQTEVUBQlUVHwWpupm61cN2NqmeYFTVISs4td7PI5/j0XXLyqzvY7z85/z/M/lz1H2P1Vhb+J/azELhGL2/lhwc53ThCEJCExeEsdWBA9MCP6jbIw29RXM7a/mLEV9+ZzBS04IvCgggXMPhfZNyHyidv8eMiIzQ9GvI4jBRIhMdh4b4BvuBCmiznY2DNgfa8cj+ZOQy6X4yEZw+8MCO+WIRwrwxpBCkQhMViLlaNzQA9jZTZWd8qY6dBJSKVSDE0UYHqxEPee6zA1X4CpuQJakCasRC9gOXoOy9vUeXj69TBYcrC0VYrZ8Cn4RnKRnJwMtz8L4zP5uPuUG3uSxwsWI6VgNs/iJdHWo2d3TElJYQsPOW6pMTqdi9EHWoxQ97W8YGH9DF6ECTI+WzqBymo5dMdlCC3bEHplQ1ewlBU0tKsQnMxBgOifyGZYwfxqMeZWijH+WIe+8WyUV4nI1x+FfywLvYTNpWQFVpcC3XfUjO82lckLZhaKMDipRddoJmO6pIauUA7vcAa8QxmwOrNYQW2zGh0DKniCKrRTARUv6Bz8E7QFlOjoL0KHvwTuPiVa/Ury8fLg6TbA3ZsHV48Czu50xuFL5wUs8PHA0ZWOlh41WaRBk1eORqLZS0p6c9HUqUCD5xhjb09jWEFiUN9GuNNQ5xZR1yrC1iLCSrlE1LpkqHXKcINyyHC9WcY3Er3ggZS51iTF1UYqFVduEg2puEzZU1Fjl6CmXoJqqk7CtzI5NEQJYSIq/oMpPl/Dfqb4ScIeh77Tv4nx+XRd0m/O6R9dbsY8+gAAAABJRU5ErkJggg==',
		headpic_enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVR42o3T21MSUQAG8H0PL4jiqKEtNMiyCywgghogGso1zZw0wwuE4liZD+WlaVBnKm1IszExzbx3+yu/zoWKp2pnfntmvznn293Zs4Lj8gf+xn5BsPH7H+ffYCMEQdAK5QH3FbYz4pSPyukX7oS6hHJc8vmCFogCv+CBfFTy6Zw7JA7OYT04g/UjdQrr/gmsReqYFtiF8kDaO4I9Owtn4hakD0eQdg+hvFiHx+OBdWUNlvcHsOzsE0VYtou0wCWUB5atPdjSWaixBFoLu4z07DlUVYUxOwfD/FMYZueJxzDkHtECt2De3IF58x3MG1vENpTxNNRoHNdfFSCurENMTUGSJDQPj6Ipk0NTeoabmuYFprUNmFap1zDlX0IZG2d3lGWZLfzFMDCEhvtTaBib5O5N8AJxeRXich7iUh7NTxYh9oTR6vUh9eYtUpsF9ObmWMHVWBL15CmYOyOoHxrhBS0LS2hZWETjRIaEd9HiD8LkckM/OAz9wDAawxFWQEd98jbqqMQgwwqaZh5CTxrr4gOM3BuGzdeB2mgStZEEjP0xVmDsj6K2LwZdOMrdjPCCmnDsd0C5R8YQmkyjpqePCMNIPmliOgdjPImaYC+0wR5oA4Q/xAt4EGKB1t+NBrKwuS8KbVcA1Z0B6Eh2jVzrbgRR7etiqrydDCsoD6raO1Dl8XFtXlS2taPSTbg8nLONqVDdhItvpEqnmwcOF2d3EioqbJQDGsXOyTZorJQCjaTgiiTzrUyObmKUyBAP/kOmNL+b/Uylk509Dn2nf3OV5tN12p+mMpxDrvx4DwAAAABJRU5ErkJggg==',
		smileys: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACZUlEQVR42o3T2U4TYRwF8HkFHsF7U2hLgbK0tCIQLxSUpIJs3VBJ0LpCoBQokLJZoAqUKqCBgkAQE4ESqdYi0LIJlYL7gstzHL9ljL1SJ/nNcvKfk5nJN8L+z/P4m+iPCuwTUdHedzP2vnGCIMQJscFr6tCMyKEJka+Umdmlvpiw+9mEHdGrT0ZacETggZEFzEduZuE0nq4WYvuDAVvvf9Nj650emyJSIBFig4235dybcswHTDBcUJPzMqwfcOGDcoT3SxGOliJEkAKZEBuEomUI7ZUwGwdV0BWrMBcogH/zDHxreZgNnsD0sxxM+bMxtZRNC+TCaqQEK5FzWNmlivFyh1veKUJNUy4stWkY9x2H15cF70IWxua50bljvCC4XQRmqxAvRPPBPEwu5qLiUjLMVQqMPNZiZFaLYeqRBkPUjIYXBNZ1eB4myNG3nM+G705nwkMYKhOhvyjH4KQa7ofEhBoDRP+4imEF/rUCLK0WwPskB31eFfrGMnCHGs1Avi4Bxsp0uB5wvfe5nhEqjRcsBE7BM6FB93Aa4xzibt1LRbr6KByuk+jypKJzUMl0uJVopwaUvKDL8ydoG0hBW38KHH0p5OMlQq2Vo9OtQevtZLS4uObeJMbek8QLWNDDA3t3Epq6FWh0KmB1qOB0F6OhSwFbZyJT38FZ2+UMK4gN6toIhxy1DhlsHUrUtytR0ypDTYsM1S1SVDdLcZOyS3GjScoXEr3gQQJzvTEB1xqoeFy1EfXxuEJZ42GxSmCpk+AyVSvhS5lsmcRZwkAY/4NBnM9kP5O4k7DHoe/0bzJxnt4X9wsdky0ocdPAVgAAAABJRU5ErkJggg==',
		smileys_enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACTUlEQVR42o3T6U8aQRgG8P1ePKAKVopIIciNgHgjUK6KR9Vq8YpFjEdia23SgG1S8EM9koq1LaJU693rr3z6zgxp+dR2k99O9snsMzubXcl58xN/47gmfPzxx9V32IkkSXKpMhC+wX5JLsRou/gqnDM3sJ2VfblmBTpJXIjAelp2cgXb601Yd/Kwlq5gKV3CcsxcwHJ0DkuROWMFDqkyMB+eCoVT+HfzcA0OwfzpBKaPn2E6OIbpQ4nGI1KEab/ICtxSZWDKH6IlX0DLXgHdtFpbrB+mVznos1toTr+BZu0lNCtr5Bk0y09ZgUcy7h7AuPseRnpc484+DNt7MGwx7+BJzMAw8BB3F1agTjHLUM8vCclFUaDf3IE+x2zTSm9xj1ZrepGBenEV+nAMulAEjbPzJIk7M2T6iTA1Jwp0GznoNrLQZbJoep7mkxoSs1yz/z4JomFimkxBNT4pPEpANZYQBdr1DLTraTTOpSh8DNXoBJQjzDh0HV2whKNQDo8JQ6OoZwZHOF6gXlqFkhrraa9cfJir6x+CwemEZ3IGdbEBEkddNI7bkX4h/EAUKCLx3wEXipEoVL1+2L1eaAeGoQiGoQiEoPCHIKdtyfuILygKRBDkgdwXgLyX8dPLiyKUTKG224farl6hs4er6ejmeEFlUNPehRpvJ6fq6YOyx4dqTzuq3V7B1cZVtXqIW3xI1S6PCJxuweEiraiyM07IbA7BaofMwtggM9twy2wVnzIdATJJUmThP6TK8wP8ZyqfHPxx2J7+zV2ez+6T/wL6VZ/4apEUFAAAAABJRU5ErkJggg==',
		bypass: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACb0lEQVR42o3T2U4TUQAG4HkFHsFLBLtMF0pAWtpaEkMChgYVkKW06pWgiEgpBaECBRJola0JoMGKQQWMQgNFschSlEorhaDigstz/J6lxl6pk3xzZv6c82dmckbY/XkBfxP/cR67RDxh57sNO984QRBShOTgHXVoQ+zQithXysZEqS9WRD9bsZ3w9lM1LTgi8KCaBcwBFzmwIPKR2/rwWxW23lfhTQIpkAjJwev9SjxZMkOpVEJnyIDlohaX6vV4FS3F5l4FwnuVCO+WIxwvxwZBCkQhOdiIV2B2oQgqlQrb+z4shBwoLs1Gi1uPwHohZkIn8fB5HqaWTJgKmmiBQliLncNqrBSrUaoM04EiqNVqrGyXYDFchGytFK3ufPgDRvjnjbg3x008M/CCUKQEzNZZvCQezRVCJpMhLS0NqampKC4TMT6rx/iMHmPUdC5Gqce5vGB58zRehAkyBlZOweXJYgtngnUYGLVBJj+KmkY1hh9oMTypxRAxeD+HYQVL62YE18zwP83DgD8H9g4NK7g9cRy3CEPeMcZ7NxueO1z/OJXFC+aXC+CbzEXfWBZjd+WwAr0pHfoT6ey6wVmAnpFMpns4E25qKJMX9Pr+BF1DGnQPGtHjrYSrt5jxjFjhHcuHy5vBtHvUTFu/mhewoJ8HbX101MA9aIB7wIAuosOrg7NHyTR3cw63gmEFyUFTF9GpgL1TJN9CRONNEdcpl4gGlxwN7XJco9rkqL8h5xuJ3vBAxlxtlaGuhZLiipNoluIy5ZCi1iFBbZMENZRdwrcyOXTEGcJCVP8HS2K+jv1MiZOEPQ59p38TE/PpupRfR6wfTYOC2egAAAAASUVORK5CYII=',
		bypass_enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVklEQVR42o3T60/TUBgG8H6Xi0MYyhxQa+a6dmNduwFyG3JnwBAYMEEuMwJRRFDCMEHQoEBCQIzhJsjd2zcT/8DH95yz6D6pTX497ZPTpz3JqVRy8R1/4zsnfPz2x9lXeIkkSTYpPRC+wHtKTsSon3wWjpkL6Ecpn85ZgSyJGxFohykHZ8JHsn8Gz/4pPHvMCTy7x/DsMEeswCelB+r2IbSFZViWBbOiAkZbO4yuGNzrH+De2oP7/T6Nu2QH7s0dVhCQ0gP3xjbU5AKCwSBmf/zEwO4BjIZGqL1xFM+9hHNqFs6JKfIEzvFJVmBKrrUtuNbewbW6QTbhfpZEKBTCzbfrkF+8hmpaCA0Ow5GYIONwjI4JIw9FgfJqFcoSswJl8Q1ckzPw+/3QNA2qquJGZTUKBkfJCK4NkHvDQnxIFMjzS5DnFyEnF1H4dA7XO7r5g/HlFURnnuOWrqOwvglXY3Hk9/QL3X3I7+oTBUXTSRRNz6FgKEFhLxxNrbzA3tkDe7QHSsDk7B1dsLffRR7T1snxAsfYY9ipMS8S5ZSWNl6g+A2OXVfG+pBLxbmNrbjS0CLUN4uCnIbW3wGj0BvaxyZQMzBE7iP6aBJ6rB854Trk1NTBVnMHtmpSVSsKRFDLA1tVGLk0SaavkJsjKG6KwEnrv1xeKZRVcNmltzlekB5kh8qRHSwTrFJkWSFkmSQQFAyLy/SbJCA2UpZhiqAkIPgM4kemlylBhu4TNC8yPIyODFXHJVUTW5mOMOknCfLgPyRS88P8Z0qdfPxz2Jr+LZCaz56z/QLxmZ2A8jxgTgAAAABJRU5ErkJggg==',
		nsfw: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACfklEQVR42o3TaVNSUQAG4PsX/Al9tJkQriCQSKImhFNOMzqRmgqITn3RytLcRRQBTVBwzxZDZ2zMFrMPambjgiYliq222PI73s5CE5+qO/PcO+edc9655865wt7PCvxN9Ec59ohozO53G3a/cYIgJAjxwQ51YEPkoAyRr5SN2aa+lGH7cxlex7z6ZKUFhwQeWFnA7HPhfQvCH7mtD7+ZsfXejJcxpEAixAeb70rhHTVCLpfj0UI+Nt6WYJNQKBR4OJ+P0JtShPaKEYoWY50gBaIQH6xHS9A1ZIAuQ4mcU2oshwuxtlMEqVSKkYlszCwbcW9Rj6mFbEzNZ9OCZGE1cg4rkUKsbFNFcPcbYC7XwXbhBKqbtJheNCIxMRFOfxqCc1m4+4Qbn83kBcvhAjBbZ/Gc6Ow1IK9AiZGglS303dKyp/26BmMzGRi7r8MNalrHC5Y2zuBZiCDPpy9Oo7xSgeNGCW4/OMm2UWAWWUGjS43ByWMYIPontAwrWFjLw/xqHoKP9QgEtSipEJFlOAL/eBo8AROkssOsoNahJG+jYbw3qVReMLeUi+FJHXrGUhnLeQ30RgW6R48icEcPQ46KFdS0auAZUsM9qIaLGlDzgq7hP0HngAqe/lx4/CY4Ayp0+FXwjRTC7SuFsy8Tjl4l2nwpjN2bwgtY4OWBvScF7b0a8sXT0dKtQDPR5iXjvgy0dCnR6JYzDa5khhXEB/WdhDMZdU4RdR0irrWLqKUcImocMtS0yXCVsstwpVXGDxId8EDKVLdIcbmZSsKlJqIxCRephiRUNUhQVS9BJVUn4UeZXOmEibAQ1v9gic1PZz9T7CZhr0P39G9ibD5dl/ALaU8cEnr7x0AAAAAASUVORK5CYII=',
		nsfw_enabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACXElEQVR42o3T6U8TQRgG8P0uVzkFbKGUQLe7Ldvulqv02GKRAg0IBLCGo6UcUURMFPCDQIwBYgKiBpD79PorH9+ZabSf1E1+O9knO8/Mbnalptuf+BvPDeHjjz+uv8NNJEmySLmB8A3uK3IpRvXyq3DB3EI9zzq7YQV2SVyIQDnNOrkWjsnRNVxHV3B9YS7hOryA64A5ZwUeKTeQ90/hyczDMAwob95C/nxMTuD3++F6vQHnxyM49w7JAZy7B6zAJ+UGzp19uFMZGIEAvGETjZs7aHz/CZqmoS7zBNbFl7DOL5JnsM4tsAJdatjeQ8P2BzRs7ZBdqOMp6L0JBIeG4ewfgm3hBWRZhm14DNXpOVSnZoWpGVHg2NiCY53ZhGPtHdTkOBTTRPzVKp9YNZLko7V/EJWPp1CZnBQeTYgC++o67KtrsK+swfZ8GfZoDPWGH05aTQuGUNsR4gX3ehKooF1wQ6OoGBwVBTVLK6hZWkbVRJrCEdQEw3D4dJQPDMOcnkWjooidxLpRnniIMqZvgOMF1bNPUU6NZb39nNIZg7u1DaXxBOppNS3QwQvqHsRR2tWDklhcuN8tCopjPb8DRh9NwpxMoTjaRWKIpjPom5lDHb3Y4nAnLOEoLCESNEWBCEweWIIRVNJEW1cclkAIRe0h3I10opauSzrCKGoNcIUt7RwvyA0Km9tQ6G8VjBYUGM0o0InPL3gNLl/TiU98SAVeXQRNPsHjJRry3UwT8lSPoLiR52JU5Mkq7siK+JTpiJAxkibT/yGdvT/Cf6bsycO3w57p33zZ+9k8yy/n7Jr7ONsu4gAAAABJRU5ErkJggg=='
	};
	ce_v_blocked = [
		{regex: /http:\/\/(www.)?chatadelic.net\//gi, replace: 'http://dpu.bl.ee/cd/'},
		{regex: /http:\/\/i.imgur.com\//gi, replace: 'http://dpu.bl.ee/im/'},
		{regex: /http:\/\/(www.)?2ch.hk\//gi, replace: 'http://dpu.bl.ee/dv/'}
	];
	ce_v_style = '.ce_hidden{display:none}.ce_nsfw{opacity:.05}.ce_nsfw:hover{opacity:1}';
	ce_v_observer = new MutationObserver(function (par_1) {
        par_1.forEach(function (par_2) {
            var nodes = par_2.addedNodes, jNodes = $(nodes);
            if (nodes !== null) {
                jNodes.each(function () {
                    ce_f_process_message($(this));
                });
            }
        });
    });
	ce_v_style_observer = new MutationObserver(function (par_1) {
        par_1.forEach(function (par_2) {
            var nodes = par_2.addedNodes, jNodes = $(nodes);
            if (nodes !== null) {
                jNodes.each(function () {
                    if($(this).attr('id') == 'dstyle') {
						if(ce_v_settings.style_disabled) {
							ce_v_saved_style = $('#dstyle, #dstyleLink').detach();
						}
					}
                });
            }
        });
    });
	ce_f_toggle_style = function() {
		if(ce_v_settings.style_disabled) {
			$('head').append(ce_v_saved_style);
		} else {
			ce_v_saved_style = $('#dstyle, #dstyleLink').detach();
		}
		ce_v_settings.style_disabled = !ce_v_settings.style_disabled;
		$('#ce_btn_style').attr('src', ce_v_settings.style_disabled? ce_v_btn_icons.style_enabled : ce_v_btn_icons.style);
		ce_f_save_settings();
	};
	ce_f_toggle_color = function() {
		$('.chatMessage').each(function() {
			ce_f_process_message_color(ce_v_settings.color_disabled, $(this));
		});
		ce_v_settings.color_disabled = !ce_v_settings.color_disabled;
		$('#ce_btn_color').attr('src', ce_v_settings.color_disabled? ce_v_btn_icons.color_enabled : ce_v_btn_icons.color);
		ce_f_save_settings();
	};
	ce_f_toggle_headpics = function() {
		$('.chatMessage').each(function() {
			ce_f_process_message_headpic(ce_v_settings.headpics_disabled, $(this));
		});
		ce_v_settings.headpics_disabled = !ce_v_settings.headpics_disabled;
		$('#ce_btn_headpic').attr('src', ce_v_settings.headpics_disabled ? ce_v_btn_icons.headpic_enabled : ce_v_btn_icons.headpic);
		ce_f_save_settings();
	};
	ce_f_toggle_smileys = function() {
		$('.chatMessage').each(function() {
			ce_f_process_message_smileys(ce_v_settings.smileys_disabled, $(this));
		});
		ce_v_settings.smileys_disabled = !ce_v_settings.smileys_disabled;
		$('#ce_btn_smileys').attr('src', ce_v_settings.smileys_disabled? ce_v_btn_icons.smileys_enabled : ce_v_btn_icons.smileys);
		ce_f_save_settings();
	};
	ce_f_toggle_bypass = function() {
		ce_v_settings.bypass_enabled = !ce_v_settings.bypass_enabled;
		ce_f_save_settings();
		$('#ce_btn_bypass').attr('src', ce_v_settings.bypass_enabled ? ce_v_btn_icons.bypass_enabled : ce_v_btn_icons.bypass);
	};
	ce_f_toggle_nsfw = function() {
		ce_v_settings.nsfw_enabled = !ce_v_settings.nsfw_enabled;
		ce_f_save_settings();
		$('.chatMessage').each(function() {
			ce_f_process_message_nsfw(ce_v_settings.nsfw_enabled, $(this));
		});
		$('#ce_btn_nsfw').attr('src', ce_v_settings.nsfw_enabled ? ce_v_btn_icons.nsfw_enabled : ce_v_btn_icons.nsfw);
	};
	ce_f_process_message = function(par_1) {
		if(ce_v_settings.color_disabled) {
			ce_f_process_message_color(false, par_1);
		}
		if(ce_v_settings.headpics_disabled) {
			ce_f_process_message_headpic(false, par_1);
		}
		if(ce_v_settings.smileys_disabled) {
			ce_f_process_message_smileys(false, par_1);
		}
		if(ce_v_settings.nsfw_enabled) {
			ce_f_process_message_nsfw(true, par_1);
		}
	};
	ce_f_process_message_color = function(par_1, par_2) {
		if(par_1) {
			par_2.find('.text, .chatUserFrom').each(function() {
				if($(this).data('ce_color')) {
					$(this).css('color', $(this).data('ce_color'));
				}
			});
		} else {
			par_2.find('.text, .chatUserFrom').each(function() {
				if($(this).css('color')) {
					$(this).data('ce_color', $(this).css('color'));
					$(this).css('color', '');
				}
			});
		}
	};
	ce_f_process_message_headpic = function(par_1, par_2) {
		if(par_1) {
			var ce_t_icon = par_2.find('.chatUserFrom.ce_headpic_hidden');
			ce_t_icon.toggleClass('hasIcon', true);
			ce_t_icon.toggleClass('ce_headpic_hidden', false);
			ce_t_icon.css('background-image', ce_t_icon.data('ce_headpic'));
		} else {
			var ce_t_icon = par_2.find('.chatUserFrom.hasIcon');
			ce_t_icon.toggleClass('hasIcon', false);
			ce_t_icon.toggleClass('ce_headpic_hidden', true);
			ce_t_icon.data('ce_headpic', ce_t_icon.css('background-image'));
			ce_t_icon.css('background-image', '');
		}
	};
	ce_f_process_message_smileys = function(par_1, par_2) {
		if(par_1) {
			par_2.find('.text img.ce_hidden').each(function() {
				$(this).toggleClass('ce_hidden', false);
			});
		} else {
			par_2.find('.text img').each(function() {
				if($(this).attr('src').indexOf('/files/s') == 0) {
					$(this).toggleClass('ce_hidden', true);
				}
			});
		}
	};
	ce_f_process_message_nsfw = function(par_1, par_2) {
		if(par_1) {
			par_2.find('.text img').each(function() {
				$(this).toggleClass('ce_nsfw', true);
			});
		} else {
			par_2.find('.text img.ce_nsfw').each(function() {
				$(this).toggleClass('ce_nsfw', false);
			});
		}
	};
	ce_f_process_text = function(par_1) {
		ce_v_blocked.forEach(function(par_2) {
			par_1 = par_1.replace(par_2.regex, par_2.replace);
		});
		return par_1;
	};
	ce_f_save_settings = function() {
		localStorage['ce_settings_' + ce_v_chat] = JSON.stringify(ce_v_settings);
	};
	(function ce_init() {
		ce_f_save_settings();
		$('head').append($('<style>').text(ce_v_style));
		$('#talkButtonsPanel').prepend(
			$('<img>').attr('id', 'ce_btn_style').attr('src', ce_v_settings.style_disabled ? ce_v_btn_icons.style_enabled : ce_v_btn_icons.style).css('margin', '0px 4px').attr('title', '¬ключить/выключить стиль чата').click(ce_f_toggle_style)
		);
		$('#talkButtonsPanel').prepend(
			$('<img>').attr('id', 'ce_btn_color').attr('src', ce_v_settings.color_disabled ? ce_v_btn_icons.color_enabled : ce_v_btn_icons.color).css('margin', '0px 4px').attr('title', '¬ключить/выключить цвета сообщений').click(ce_f_toggle_color)
		);
		$('#talkButtonsPanel').prepend(
			$('<img>').attr('id', 'ce_btn_headpic').attr('src', ce_v_settings.headpics_disabled ? ce_v_btn_icons.headpic_enabled : ce_v_btn_icons.headpic).css('margin', '0px 4px').attr('title', '¬ключить/выключить головастики').click(ce_f_toggle_headpics)
		);
		$('#talkButtonsPanel').prepend(
			$('<img>').attr('id', 'ce_btn_smileys').attr('src', ce_v_settings.smileys_disabled ? ce_v_btn_icons.smileys_enabled : ce_v_btn_icons.smileys).css('margin', '0px 4px').attr('title', '¬ключить/выключить смайлики').click(ce_f_toggle_smileys)
		);
		$('#talkButtonsPanel').prepend(
			$('<img>').attr('id', 'ce_btn_bypass').attr('src', ce_v_settings.bypass_enabled ? ce_v_btn_icons.bypass_enabled : ce_v_btn_icons.bypass).css('margin', '0px 4px').attr('title', '¬ключить/выключить обход спам-листа').click(ce_f_toggle_bypass)
		);
		$('#talkButtonsPanel').prepend(
			$('<img>').attr('id', 'ce_btn_nsfw').attr('src', ce_v_settings.nsfw_enabled ? ce_v_btn_icons.nsfw_enabled : ce_v_btn_icons.nsfw).css('margin', '0px 4px').attr('title', '¬ключить/выключить скрытие изображений').click(ce_f_toggle_nsfw)
		);
		ce_v_observer.observe($('.chatMessages')[0], {attributes: true, childList: true, characterData: true});
		ce_v_style_observer.observe($('head')[0], {attributes: true, childList: true, characterData: true});
		$('#chatInputMessageText').keyup(function() {
			if(ce_v_settings.bypass_enabled == true) {
				$(this).val(ce_f_process_text($(this).val()));
			}
		});
	})();
});