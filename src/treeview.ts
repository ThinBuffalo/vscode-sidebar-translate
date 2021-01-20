import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window, Event, ProviderResult } from 'vscode';
import { join } from 'path';
const iconmap = new Map<string, string>([
    ['result1', 'icon/dot-fill.svg'],
]);
export class TreeItemNode extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapesible: TreeItemCollapsibleState,
    ) {
        super(label, collapesible);
    }
    command = {
        title: this.label,
        command: 'input',
        tooltip: this.label,
        arguments: [
            this.label,
        ]
    };
    iconPath = TreeItemNode.getIconUriForLabel(this.label);
    static getIconUriForLabel(label: string): Uri {
        return Uri.file(join(__filename, '..', '..', 'src', 'assert', iconmap.get(label) + ''));
    }
}
export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    onDidChangeTreeData?: Event<void | TreeItemNode | null | undefined> | undefined;
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }
    getChildren(element?: TreeItemNode|undefined): ProviderResult<TreeItemNode[]> {
        return ['result1'].map(

            item => new TreeItemNode(
                item as string,
                TreeItemCollapsibleState.None as TreeItemCollapsibleState,
            )
        );
    }
    public static initTreeViewItem() {

        // 实例化 TreeViewProvider
        const treeViewProvider = new TreeViewProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        window.registerTreeDataProvider('treeView-item', treeViewProvider);
    }
}
