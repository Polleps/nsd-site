export enum NodeType {
  Heading1 = 'heading-1',
  Heading2 = 'heading-2',
  P = 'paragraph',
  Text = 'text',
  Li = 'list-item',
  Ul = 'unordered-list',
  Ol = 'ordered-list',
  Asset = 'embedded-asset-block',
  Document = 'document',
  Hyperlink = 'hyperlink',
}

export enum MarkType {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
}

export interface Mark {
  type: MarkType;
}

export type PossibleNode = Node | HyperlinkNode | AssetNode;

export interface Node {
  nodeType: NodeType;
  content?: PossibleNode[];
  value?: string;
  marks: Mark[];
  data: Record<string, unknown>;
}

export interface HyperlinkNode extends Node {
  nodeType: NodeType.Hyperlink;
  data: {
    uri: string;
  };
}

export interface DocumentNode extends Node {
  nodeType: NodeType.Document;
  content: PossibleNode[];
  data: {};
  value: undefined;
}

export interface AssetNode extends Node {
  nodeType: NodeType.Asset;
  content: [];
  data: {
    target: {
      sys: {
        id: string;
        type: 'Link';
        linkType: 'Asset';
      };
    };
  };
}

export interface Article {
  title: string;
  thumbnail: {
    url: string;
  };
  description: string;
  content: {
    json: DocumentNode;
    links: {
      assets: {
        block: [
          {
            sys: {
              id: string;
            };
            url: string;
          }
        ];
      };
    };
  };
}
