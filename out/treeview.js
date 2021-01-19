"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewProvider = exports.TreeItemNode = void 0;
const vscode_1 = require("vscode");
const path_1 = require("path");
const iconmap = new Map([
    ['result1', 'icon/dot-fill.svg'],
]);
class TreeItemNode extends vscode_1.TreeItem {
    constructor(label, collapesible) {
        super(label, collapesible);
        this.label = label;
        this.collapesible = collapesible;
        this.command = {
            title: this.label,
            command: 'input',
            tooltip: this.label,
            arguments: [
                this.label,
            ]
        };
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    static getIconUriForLabel(label) {
        return vscode_1.Uri.file(path_1.join(__filename, '..', '..', 'src', 'assert', iconmap.get(label) + ''));
    }
}
exports.TreeItemNode = TreeItemNode;
class TreeViewProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return ['result1'].map(item => new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None));
    }
    static initTreeViewItem() {
        // 实例化 TreeViewProvider
        const treeViewProvider = new TreeViewProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        vscode_1.window.registerTreeDataProvider('treeView-item', treeViewProvider);
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=treeview.js.map