# Content Format

json!

example)

```json
{
  "type": "Board",
  "name": "fun",
  "children": [
    {
      "type": "Image",
      "src": "https://fr.pornhub.com",
      "children": []
    },
    {
      "type": "RichText",
      "bold": true,
      "text": "I need the freedom of https!!",
      "children": []
    },
    {
      "type": "Group",
      "children": [
        {
          "type": "Image",
          "src": "https://fr.pornhub.com",
          "children": []
        },
        {
          "type": "RichText",
          "bold": true,
          "text": "I need the freedom of https!!",
          "children": []
        }
      ]
    }
  ]
}
```

why?

-- thinking process --

What data now we use?

1. title
2. text
3. media (image, video)

Data Type
  number
  string
  boolean
  List

<Candidates>
1. xml-like document
  - pros
    - Easy to know node type. (<type>???</type>)
    - Easy to read
  - cons
    - Hard to know value type // (<node type="number">123</node>)
    - Only string on tag
    - Hard to make union type // This data is runtime data, you always cannot check type!
    - Dictionary need node's name as key!! // make parser better
2. yml-or-json-like document
  - pros
    - yml: Easy to write
    - json: Easy to know end of node
  - cons
    - yml && json :



```json
{
  "type": "element",
  "children": []
}

{
  "type": "List",
  "children": [{
    "type": "element",
    "children": []
  }, {
    "type": "element",
    "children": []
  }]
}

{
  "type": "Board",
  "name": "fun",
  "children": [{
    "type": "Image",
    "src": "https://fr.pornhub.com",
    "children": []
  }, {
    "type": "Text",
    "bold": true, // this is pros of json!
    "children": ["I need the freedom of https!!"]
  }]
}
```



```xml
<Dictionary>
  <key>value</key>
</Dictionary>

<List>
  <element></element>
</List>

<Comments type="list">
  <comment></comment>
  <comment></comment>
  <comment></comment>
  <comment></comment>
  <comment></comment>
  <comment></comment>
  <comment></comment>
</Comments>
```
