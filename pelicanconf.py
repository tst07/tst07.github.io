#!/usr/bin/env python
# -*- coding: utf-8 -*- #

from datetime import datetime

AUTHOR = 'Prakhar Mishra'
SITENAME = 'Prakhar Mishra'
SITEURL = ''
SITETITLE = "Prakhar Mishra"
SITESUBTITLE = "Software Engineer"
SITEDESCRIPTION = "Foo Bar's Thoughts and Writings"
SITELOGO = SITEURL + "/images/prakhar.jpeg"

PATH = 'content'

TIMEZONE = 'Asia/Kolkata'
STATIC_PATHS = ['images']
DEFAULT_LANG = 'en'
THEME = 'Flex'
THEME_COLOR = 'dark'
THEME_COLOR_AUTO_DETECT_BROWSER_PREFERENCE = True
THEME_COLOR_ENABLE_USER_OVERRIDE = True
MAIN_MENU = True

PYGMENTS_STYLE = 'emacs'
PYGMENTS_STYLE_DARK = 'monokai'

# Plugins
PLUGINS = ['tipue_search']
GOOGLE_ANALYTICS = "UA-191819273-1"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
RSS_FEED_SUMMARY_ONLY = False

DATE_FORMATS = {
    "en": "%B %d, %Y",
}

COPYRIGHT_YEAR = datetime.now().year

# Blogroll
LINKS = (
         ('Home', '#'),
         ('Categories', '#'),
         ('Tags', '#'),
         ('About', '#'),
         ('Contact', '#'))

SOCIAL = (
    ("linkedin", "https://www.linkedin.com/in/prakhar1467-11"),
    ("github", "https://github.com/tst07"),
    ("youtube", "https://www.youtube.com/channel/UC4J1E1YPJy8PH0F1rnOaYfQ"),
)

MENUITEMS = (
    ("Archives", "/archives.html"),
    ("Categories", "/categories.html"),
    ("Tags", "/tags.html"),
)


DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
