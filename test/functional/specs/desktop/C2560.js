import { t, ClientFunction } from "testcafe";
import fixtureFactory from "../../helpers/fixtureFactory";
import testServerUrl from "../../helpers/constants/testServerUrl";

const urlCollector = `${testServerUrl}/test/functional/sandbox/html/C2560.html`;

const getAlloyFunction = ClientFunction(() => !!window.alloy);

fixtureFactory({
  title: "C2560: Global function named alloy is accessible.",
  url: urlCollector
});

test.meta({
  ID: "C2560",
  SEVERITY: "P0",
  TEST_RUN: "Regression"
});

test("Test C2560: The global function named alloy is accessible.", async () => {
  const alloy = await getAlloyFunction();
  await t.expect(alloy).ok();
});
