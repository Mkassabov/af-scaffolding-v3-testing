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
	logger.debug(0);
	const assetTree = await selfGitTree.getEntry("/assets");
	logger.debug(1);
	if (assetTree.type !== "tree") {
		logger.error("No asset folder found");
		throw new Error("No asset folder found");
	}
	logger.debug(2);
	logger.info("Adding assets folder");
	await projectGitTree.deleteFile("test.md").catch(() => {});
	logger.debug(3);
	await projectGitTree.addTree("/assets", await assetTree.retriveFullTree());
	logger.debug(4);
	logger.debug(await projectGitTree.retriveFullTree());
	logger.debug(5);
	await projectGitTree.commit("Add assets folder");
	logger.debug(6);
	logger.success("fixed assets folder");
}
