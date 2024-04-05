import type { SmartGithubTree } from "@aerofoil/core/soft/lazyGitTree/Github";
// import { throwFail } from "@aerofoil/core/soft/lazyGitTree/utils";
import type { ServerCore } from "@aerofoil/logger";
// import { child } from "~/child";

export async function main({
	logger,
	selfGitTree,
	projectGitTree,
}: {
	logger: ServerCore;
	selfGitTree: SmartGithubTree;
	projectGitTree: SmartGithubTree;
}) {
	const assetTree = await selfGitTree.getEntry("/assets");
	if (assetTree.type !== "tree") {
		logger.error("No asset folder found");
		throw new Error("No asset folder found");
	}
	logger.info("Adding assets folder");
	await projectGitTree.deleteFile("test.md").catch(() => {});
	await projectGitTree.addTree("/assets", await assetTree.retriveFullTree());
	logger.debug(await projectGitTree.retriveFullTree());
	await projectGitTree.commit("Add assets folder");
	logger.success("fixed assets folder");
}
