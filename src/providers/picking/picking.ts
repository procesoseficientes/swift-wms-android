import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { ReceptionProvider } from "../reception/reception";

declare const Buffer: { from: (arg0: any) => any; }

@Injectable()
export class PickingProvider {
    constructor(
        protected api: ApiClientV3Provider,
        private settings: UserSettingsProvider,
        private reception: ReceptionProvider
    ) {}

    public async getPickingHeaders(
        task: DataRequest.GetTaskList
    ): Promise<Array<Model.PickingTaskHeader>> {
        try {
            let tasks: Array<DataResponse.Task> = await this.api.getTasksByWavePickingId(
                task
            );

            tasks.forEach(t => {
                t.locationSpotSource = t.License.currentLocation;
            });

            let objectPickingHeader = await this.getHeaders(tasks);
            return await this.addSerialNumbersToTasks(
                objectPickingHeader.pickingTasks
            );
        } catch (error) { console.log(error)
            return Promise.reject(error); // FIXME: send a proper error message
        }
    }

    private getHeaders(
        tasks: Array<DataResponse.Task>
    ): Promise<Model.ObjectPickingHeader> {
        let pickingTasks: Array<Model.PickingTaskHeader> = [];

        let result = tasks.reduce(
            (
                groupedTasks: {
                    [materialId: string]: Model.PickingTaskHeader;
                },
                currentTask: DataResponse.Task
            ) => {
                let task: Model.PickingTaskHeader =
                    groupedTasks[currentTask.materialId];

                if (!task) {
                    if (!currentTask.Material.image1){
                        currentTask.Material.image1 = 
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMp0lEQVR4XtWaCXQUVbrH/9+tqu7qdCcBzAoGwhK2J8gimxl98JxFUBw2GcVBWVQQNDCOwOiA4IGBOaIwHnB9AqM8VJ6CgDx4Z1QUBQFNRGQLSyCBSGjMoiSd7uquuvfdbpIm6aZDx+eMx985/9Od6tT3ff/vLpXTNySEwM8Zhp87P8IIdJW6AT+c/lILpG6RavmvHIFeDjs2Ajgq9YVNxe5mGHFI3Zpgp08B7HM5aC4R3lcVuO1aKGb/f6aBbJkwmGR/Wgt2x8o8HW/OdSA7g/Unwh4A90kpuDKdpfIcNhQB2N49mw16fY4Dxetcyv6XXLRooq61voYND5qS5oKx7pZyoQlCi5iIEAfJjLCACNOdOinPPayzEbkadBtCVHsF8lb48NZHAcjPCz0+MR5APi4xOdFBE+Xv5EJy1xANU27TMLDbJZ/h7AIImNJZvomn1/t5/gmLSbMVXj/mAnjphxpgUnfLQH/zBZCSN9KGR0bY0CaFhZMCAvXsK7QwZbnPPP4NrxYiZCBRamDvjgp/YJjGbu6hoFNmjIEXaMReGev59/x4+1MTckQO1RpiPoCN8RpQpMbIG5fIG9uPuFHFkkl2tM9gMZMeKuZYtyOAl7cFLJlMYYwEgYTFOcv7rQ1PT7aHvUYhYl/76GsLi9YbfPcRiwFYLBU0YjZlYIh0vFw6vv72ASoeHWXDjd2VmMnf2hmQhZvi/f0mOR0qvzY9nTl0G74qPI1B13fFiTPnzPKqi2pOayZWTNVpcA8lRvGiSUMvbQ9g5qsGNAU7A1ZofZSpaEzrZCct/d4jxrXPIL7gHh3DpYFQMAtRbNpjYtm7fuvz45aS0sKBnp2z0DYjhamqglJ3BYKkt2qBtJYtVHdFFYrPldKtT3owS07DWaM0JDnoikYoxsg89GsN7VMZ7l7mvYkx5BsBjI4cgS1Sw1fP0DHmFxps6pW6IbDtCxPz1vn54TOcZVzjQse2WUhtmQyqS+01/Dh0sgTfVdfgVwN7N3rmnDxbhiNFJUhNJr7k93Y27iYVofQi/ilVViXwi3m1VmmFOBs5AnuCBjQFsJFo1HWScssbp71sYGu+icyURHZTn7ZIaZGESPwBE7U+A0nOBDSEiJDTtjVap7ZC4aliNmllFZ7dzMTDQzUa2V9BSyfFKjxMwALWyHV2rlIwADsYGrNE1/DK+GU+FJzgII6wtu4z0W9WLd9xUIgBPbpgYM/rwsXHhhBGXJZT19G3e1fk9uoOr5VMD71ioMejXv7MpgAuVAmA47Ksy+9ragVGLfWJp97xgzE8BmDylRaxYtdwKD2ZcnYvSgi+xxNvGHj1w2DXk0SPnI7kdOhoApnIhwPHT8OyLNzc5zpcje9qPCg6W4oz5yvRIoH4Y7dpbOot6uU1IoAiN8e4FwzzwBkuuMBvAWxvahdqr2vY1TaFpYOAM+Vg3Tu2p3aZaWgSgRAW5zh6+qws6FsMy70B8VLj9YWMFJ/7FokO4vcMUtj8kRp2HOaYvMqwuMB5XwC3A/gqnufAcKktRMAvB/SCK8ERo+BouBAoLA4W4o7DQHRMuX6kiXOorqniGgVESQVXFIZNFsdoADyev4UmqQrW1s/iwyeO8VPfnIfH62s4l2MiuADnHHESFTNBt6NLdju4nC1ZsHhcIqWuqdSUgaQEGzYAWDWmn5q8eaYdHz+hI7ejnx2Uc/r9vfvF5wcPibLySjSF1zDkFupBYoIjnqKjKCm7gA/25fMLFW7xwj0aZsj10DGVBgDYJOs7COBm1KHiMlm6hu0WR7c3p9ox+gYF9Qx8wI5nxgp8dNSi53d4xN6Dx3BNki66dehAwf0/koBlwTQtOHR7w4KvirvyOxwvPo3yiz6MH6iwRSPsaJ1MCPL0aE3LL+aYsT7QNb+E79Q1vOYLYEb9GsiVF/7baaeMrTPsrG87hoZQRPJPjnHM3uAXBSWcenTKRqeszKgOHjhxGp2z2qBr9rW4GqJuzRSWlKJXFhN/HanRLV0YQFc2/vpeC/f/lx9CYEv9CMyWblofekpHu1YAuGhyl7k5h7Bnjp0WvBfA4u3FKK8qt67r1ElxORzhgoKyaWpcW+iRoiLurvKwRXdomP1rlYga5xNCCgAjhMjtyGBTYBkmXGp9U6XumPuuH8+M0ZCeRFcddpJ6ariGwTkKpr3loZ0FB0SHa9tQu4w0iLrEftNEU5xxfyufF0WiSzrR+on2UGFXghqMxNEygSHLDc4IhwH8ruE2OtquYk2CjZxLR2lsXH8FmoK4qDGAP28O4LW9FvcYgl2b1goghuzMNKS2iF4jlhV8ThTjRKkb4wcoWHGXDU4brsruIo7bVhochJMeI7SQ3Q0tbzBMdAtYYkdwfvX+i89auM1EPLjswHNjNZxeZGdzh6mo9VRZpe5ynHO7UVVdg4ZU13qx9+DBUPFPj9Kw+t74in/7Swv/sdxAgKNAFj8AgLupB9ntKsOzJkfncf0UzBumoVMaIV4u+oB1+0w8+4HJSyoFS2/pFBkpaeQ1/HKBl1k92wArf6cpfdoyxMPsjQEs/9CEwvCOxTEBgCeeJ/FAqT02FeAc4pfdFMobospdgpDqis+MLwB8ctLCkv81+a6TPFzt9MEqlo3RwOII8/zHJma+HYBkrdS9cX8rodsAImD9/AQsfUinwxc4H7bSQNvHfWLcKj9OlwtcDV0DBmQz2FWESHKS2a2DYgWLyl1qiOKK2DG8AWDyWn+oeCIYAP7crK9VTAskRDCptP0bDfmvuNhHf3Ni2ggb7SzivPtTvmBnUemJbeTLMxx9FhvWZ6c4VxVYc+7X1YK3E5V//KcLxd8LkfOkL1TkB4UcDTnmFhi8zODv7Of8wTvtUJVwrfEbIEBAEjARJBSkZweG+RPs2POik00facOCrQFcv8jga/dZEBE+Xtxp4salBrIyGS3Pc6gAWG5vBUTATX1V7N+QxBY+ouPTEsGHrjDwgNw4FsuGTH0jGNMnqgWwa52LTRlrg8WhxjKgIgbJLkos/15AtxEiaeEiPCmN3DdUw4LVBk163S9Hg/i0f1fZ4M4Mf9luine+tOiR0TrmTXKwzbsC4ALUNpOhnpRWhMcmOfCHCQ724psGlq3xWdVfmRAC9KcHHWzGeJ0SXQx75TUJNduAqmCiLs23y6BLbav3QRR+bddawZq5Ntp7xMTC1V42a2NAmBaIEejlOUm48xY7AMJ3HhN2jYQzUSUoDCCgPqCiAA/fp2H6eJfiNQS4ICQ6CUBdTkWETAHQmmXAplHntJZErkQVIAoXTmEDl5MM6qlh23MJKCvntGWXgX7dbejTzRY2ylQ/BCRMA6mNDYTjguC0ow4Km0zPYPUGBkkVxj8CKiUlOogUVQsnkor9XiozE5g6Vo/67KKXgg0RqsNO0ELG60JRlJloAxocOllen+gDYE3cBnyGSOvQRiUEDRCkLgelcPfD1yJMscv3gEJfg2RnaXAl6wBiFB7DgFMFFIUEIGzNmkIg4mAE0hpOoYjORxgJG4s0SAw2GxOk2oHozjc5Chu3VKHGw1UAxc0yIAAmATRbg2LC3Y/ofOS1xl1VVAUWp2Cs+usRxdabb2zq8wIP7p1WzBWFNliWeLY5BpIqv+cJ7bN0UEMDkuiRiH6liI5eqLQgNwMiVYvseOTPYU4W+XDrqKNcCBTI4icA8DfLQMAU1uoNVYrfIjZ7SgYy01QAUTtR9FQgghAA1X3mMzg+3nORjx2dyqAoiIcvCmow4q4jprz3G9MUwwHUQtIcA2WcozcjjFy3ufLxN7ZUuhb+MYsmjE2F3cYAitjuIqCIa91zEujYcS+/2omQ7DReXnUeM+eckl7pc1n8GADu/+8JTTpjeJxzzMjOsvP5f8hio4a2QnN4YukZ7M6vtr74pJeCGGzaWoHFS0ut/QdqlLrTmJlSxo9xRubmPBSst/vbwLaJj57EgNsP8ne3VyJeAgEBxghX4j0Zp9eg/dadvy9E4bHaAwBypR6SMn7sQ76vvD4+HMDwklLjwARpZNIfi3D2nIEfQkWliSl5JzHq7qM4UeT9GsBvZPx+AD77Zx+zbvUavA+Aif/zYVVFn1u/Fs+/5sbFagvRxJ4uXXrlW6+tu2AAuN/vF8F4/5Di/8pz4r/7DN5ZCKx44q8l6PmrA1bevNPYU1B95UR1mV79+3kEp4unlr9nWeLfAKzCJegnOKkP01e3s5dUhWoAiP69XNbDEzLE2uc6icpD/cTMBzNF394uvnBeOwFAMIYX0Bj6iQ2ESZK6TZr5TFPJDUC0ybD5c9rrfqJQ4VzX2dyf/n8l4p+ePaVWS1VLCamhkPwMDEQxRGq6lIYfmf8DzLdVIkz/+Z4AAAAASUVORK5CYII=";
                    }
                    else{
                        let buff = Buffer.from(currentTask.Material.image1.data)
                        let img  = buff.toString()
                        if (img == 'NULL'){
                            currentTask.Material.image1 = 
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMp0lEQVR4XtWaCXQUVbrH/9+tqu7qdCcBzAoGwhK2J8gimxl98JxFUBw2GcVBWVQQNDCOwOiA4IGBOaIwHnB9AqM8VJ6CgDx4Z1QUBQFNRGQLSyCBSGjMoiSd7uquuvfdbpIm6aZDx+eMx985/9Od6tT3ff/vLpXTNySEwM8Zhp87P8IIdJW6AT+c/lILpG6RavmvHIFeDjs2Ajgq9YVNxe5mGHFI3Zpgp08B7HM5aC4R3lcVuO1aKGb/f6aBbJkwmGR/Wgt2x8o8HW/OdSA7g/Unwh4A90kpuDKdpfIcNhQB2N49mw16fY4Dxetcyv6XXLRooq61voYND5qS5oKx7pZyoQlCi5iIEAfJjLCACNOdOinPPayzEbkadBtCVHsF8lb48NZHAcjPCz0+MR5APi4xOdFBE+Xv5EJy1xANU27TMLDbJZ/h7AIImNJZvomn1/t5/gmLSbMVXj/mAnjphxpgUnfLQH/zBZCSN9KGR0bY0CaFhZMCAvXsK7QwZbnPPP4NrxYiZCBRamDvjgp/YJjGbu6hoFNmjIEXaMReGev59/x4+1MTckQO1RpiPoCN8RpQpMbIG5fIG9uPuFHFkkl2tM9gMZMeKuZYtyOAl7cFLJlMYYwEgYTFOcv7rQ1PT7aHvUYhYl/76GsLi9YbfPcRiwFYLBU0YjZlYIh0vFw6vv72ASoeHWXDjd2VmMnf2hmQhZvi/f0mOR0qvzY9nTl0G74qPI1B13fFiTPnzPKqi2pOayZWTNVpcA8lRvGiSUMvbQ9g5qsGNAU7A1ZofZSpaEzrZCct/d4jxrXPIL7gHh3DpYFQMAtRbNpjYtm7fuvz45aS0sKBnp2z0DYjhamqglJ3BYKkt2qBtJYtVHdFFYrPldKtT3owS07DWaM0JDnoikYoxsg89GsN7VMZ7l7mvYkx5BsBjI4cgS1Sw1fP0DHmFxps6pW6IbDtCxPz1vn54TOcZVzjQse2WUhtmQyqS+01/Dh0sgTfVdfgVwN7N3rmnDxbhiNFJUhNJr7k93Y27iYVofQi/ilVViXwi3m1VmmFOBs5AnuCBjQFsJFo1HWScssbp71sYGu+icyURHZTn7ZIaZGESPwBE7U+A0nOBDSEiJDTtjVap7ZC4aliNmllFZ7dzMTDQzUa2V9BSyfFKjxMwALWyHV2rlIwADsYGrNE1/DK+GU+FJzgII6wtu4z0W9WLd9xUIgBPbpgYM/rwsXHhhBGXJZT19G3e1fk9uoOr5VMD71ioMejXv7MpgAuVAmA47Ksy+9ragVGLfWJp97xgzE8BmDylRaxYtdwKD2ZcnYvSgi+xxNvGHj1w2DXk0SPnI7kdOhoApnIhwPHT8OyLNzc5zpcje9qPCg6W4oz5yvRIoH4Y7dpbOot6uU1IoAiN8e4FwzzwBkuuMBvAWxvahdqr2vY1TaFpYOAM+Vg3Tu2p3aZaWgSgRAW5zh6+qws6FsMy70B8VLj9YWMFJ/7FokO4vcMUtj8kRp2HOaYvMqwuMB5XwC3A/gqnufAcKktRMAvB/SCK8ERo+BouBAoLA4W4o7DQHRMuX6kiXOorqniGgVESQVXFIZNFsdoADyev4UmqQrW1s/iwyeO8VPfnIfH62s4l2MiuADnHHESFTNBt6NLdju4nC1ZsHhcIqWuqdSUgaQEGzYAWDWmn5q8eaYdHz+hI7ejnx2Uc/r9vfvF5wcPibLySjSF1zDkFupBYoIjnqKjKCm7gA/25fMLFW7xwj0aZsj10DGVBgDYJOs7COBm1KHiMlm6hu0WR7c3p9ox+gYF9Qx8wI5nxgp8dNSi53d4xN6Dx3BNki66dehAwf0/koBlwTQtOHR7w4KvirvyOxwvPo3yiz6MH6iwRSPsaJ1MCPL0aE3LL+aYsT7QNb+E79Q1vOYLYEb9GsiVF/7baaeMrTPsrG87hoZQRPJPjnHM3uAXBSWcenTKRqeszKgOHjhxGp2z2qBr9rW4GqJuzRSWlKJXFhN/HanRLV0YQFc2/vpeC/f/lx9CYEv9CMyWblofekpHu1YAuGhyl7k5h7Bnjp0WvBfA4u3FKK8qt67r1ElxORzhgoKyaWpcW+iRoiLurvKwRXdomP1rlYga5xNCCgAjhMjtyGBTYBkmXGp9U6XumPuuH8+M0ZCeRFcddpJ6ariGwTkKpr3loZ0FB0SHa9tQu4w0iLrEftNEU5xxfyufF0WiSzrR+on2UGFXghqMxNEygSHLDc4IhwH8ruE2OtquYk2CjZxLR2lsXH8FmoK4qDGAP28O4LW9FvcYgl2b1goghuzMNKS2iF4jlhV8ThTjRKkb4wcoWHGXDU4brsruIo7bVhochJMeI7SQ3Q0tbzBMdAtYYkdwfvX+i89auM1EPLjswHNjNZxeZGdzh6mo9VRZpe5ynHO7UVVdg4ZU13qx9+DBUPFPj9Kw+t74in/7Swv/sdxAgKNAFj8AgLupB9ntKsOzJkfncf0UzBumoVMaIV4u+oB1+0w8+4HJSyoFS2/pFBkpaeQ1/HKBl1k92wArf6cpfdoyxMPsjQEs/9CEwvCOxTEBgCeeJ/FAqT02FeAc4pfdFMobospdgpDqis+MLwB8ctLCkv81+a6TPFzt9MEqlo3RwOII8/zHJma+HYBkrdS9cX8rodsAImD9/AQsfUinwxc4H7bSQNvHfWLcKj9OlwtcDV0DBmQz2FWESHKS2a2DYgWLyl1qiOKK2DG8AWDyWn+oeCIYAP7crK9VTAskRDCptP0bDfmvuNhHf3Ni2ggb7SzivPtTvmBnUemJbeTLMxx9FhvWZ6c4VxVYc+7X1YK3E5V//KcLxd8LkfOkL1TkB4UcDTnmFhi8zODv7Of8wTvtUJVwrfEbIEBAEjARJBSkZweG+RPs2POik00facOCrQFcv8jga/dZEBE+Xtxp4salBrIyGS3Pc6gAWG5vBUTATX1V7N+QxBY+ouPTEsGHrjDwgNw4FsuGTH0jGNMnqgWwa52LTRlrg8WhxjKgIgbJLkos/15AtxEiaeEiPCmN3DdUw4LVBk163S9Hg/i0f1fZ4M4Mf9luine+tOiR0TrmTXKwzbsC4ALUNpOhnpRWhMcmOfCHCQ724psGlq3xWdVfmRAC9KcHHWzGeJ0SXQx75TUJNduAqmCiLs23y6BLbav3QRR+bddawZq5Ntp7xMTC1V42a2NAmBaIEejlOUm48xY7AMJ3HhN2jYQzUSUoDCCgPqCiAA/fp2H6eJfiNQS4ICQ6CUBdTkWETAHQmmXAplHntJZErkQVIAoXTmEDl5MM6qlh23MJKCvntGWXgX7dbejTzRY2ylQ/BCRMA6mNDYTjguC0ow4Km0zPYPUGBkkVxj8CKiUlOogUVQsnkor9XiozE5g6Vo/67KKXgg0RqsNO0ELG60JRlJloAxocOllen+gDYE3cBnyGSOvQRiUEDRCkLgelcPfD1yJMscv3gEJfg2RnaXAl6wBiFB7DgFMFFIUEIGzNmkIg4mAE0hpOoYjORxgJG4s0SAw2GxOk2oHozjc5Chu3VKHGw1UAxc0yIAAmATRbg2LC3Y/ofOS1xl1VVAUWp2Cs+usRxdabb2zq8wIP7p1WzBWFNliWeLY5BpIqv+cJ7bN0UEMDkuiRiH6liI5eqLQgNwMiVYvseOTPYU4W+XDrqKNcCBTI4icA8DfLQMAU1uoNVYrfIjZ7SgYy01QAUTtR9FQgghAA1X3mMzg+3nORjx2dyqAoiIcvCmow4q4jprz3G9MUwwHUQtIcA2WcozcjjFy3ufLxN7ZUuhb+MYsmjE2F3cYAitjuIqCIa91zEujYcS+/2omQ7DReXnUeM+eckl7pc1n8GADu/+8JTTpjeJxzzMjOsvP5f8hio4a2QnN4YukZ7M6vtr74pJeCGGzaWoHFS0ut/QdqlLrTmJlSxo9xRubmPBSst/vbwLaJj57EgNsP8ne3VyJeAgEBxghX4j0Zp9eg/dadvy9E4bHaAwBypR6SMn7sQ76vvD4+HMDwklLjwARpZNIfi3D2nIEfQkWliSl5JzHq7qM4UeT9GsBvZPx+AD77Zx+zbvUavA+Aif/zYVVFn1u/Fs+/5sbFagvRxJ4uXXrlW6+tu2AAuN/vF8F4/5Di/8pz4r/7DN5ZCKx44q8l6PmrA1bevNPYU1B95UR1mV79+3kEp4unlr9nWeLfAKzCJegnOKkP01e3s5dUhWoAiP69XNbDEzLE2uc6icpD/cTMBzNF394uvnBeOwFAMIYX0Bj6iQ2ESZK6TZr5TFPJDUC0ybD5c9rrfqJQ4VzX2dyf/n8l4p+ePaVWS1VLCamhkPwMDEQxRGq6lIYfmf8DzLdVIkz/+Z4AAAAASUVORK5CYII=";
                        }
                        else{
                            currentTask.Material.image1 = img
                        }

                    }
                    task = {
                        qtyPending: 0,
                        qtyAssigned: 0,
                        wavePickingId: currentTask.wavePickingId,
                        Material: currentTask.Material,
                        Tasks: [],
                        icon: "arrow-dropright",
                        showDetails: false,
                        SerialNumbers: [],
                        qty: 0
                    };

                    groupedTasks[currentTask.materialId] = task;
                    pickingTasks.push(task);
                }
                task.qtyPending += currentTask.quantityPending;
                task.qtyAssigned += currentTask.quantityAssigned;
                task.Tasks.push(currentTask);

                return groupedTasks;
            },
            {}
        );
        let objectPickingHeader: Model.ObjectPickingHeader = {
            pickingTasks: pickingTasks,
            objectReduce: result
        };
        return Promise.resolve(objectPickingHeader);
    }

    private async addSerialNumbersToTasks(
        pickingTasks: Array<Model.PickingTaskHeader>
    ): Promise<Array<Model.PickingTaskHeader>> {
        return pickingTasks.map((header: Model.PickingTaskHeader) => {
            header.Tasks.forEach(async (task: Model.Task) => {
                if (
                    task.isDiscretionary === Enums.YesNo.Yes &&
                    header.Material.serialNumberRequests === Enums.YesNo.Yes
                ) {
                    let request: DataRequest.GetRequestedSerialNumbersInDiscretionalPickingByLicense = DataRequest.Factory.createGetRequestedSerialNumbersInDiscretionalPickingByLicenseRequest(
                        task.licenseIdSource,
                        task.wavePickingId,
                        task.materialId,
                        this.settings.userCredentials
                    );
                    task.Material.SerialNumbers = await this.getSerialNumbersForPicking(
                        request
                    );
                } else {
                    task.Material.SerialNumbers = [];
                }
                return task;
            });
            return header;
        });
    }

    public cancelPickingDetailLine(
        task: DataRequest.CancelPickingDetailLine
    ): Promise<DataResponse.Operation> {
        return this.api.cancelPickingDetailLine(task);
    }

    public async getSerialNumbersForPicking(
        task: DataRequest.GetRequestedSerialNumbersInDiscretionalPickingByLicense
    ): Promise<Array<Model.MaterialSerialNumber>> {
        try {
            let serials: Array<DataResponse.OP_WMS_SP_GET_REQUESTED_SERIAL_NUMBERS_DISCRETIONAL_PICKING_BY_LICENSE> = await this.api.getRequestedSerialNumbersInDiscretionalPickingByLicense(
                task
            );

            let serialNumbers: Array<Model.MaterialSerialNumber> = serials.map(
                (
                    serial: DataResponse.OP_WMS_SP_GET_REQUESTED_SERIAL_NUMBERS_DISCRETIONAL_PICKING_BY_LICENSE
                ) => {
                    let serialNumber: Model.MaterialSerialNumber = Model.Factory.createSerialNumber();
                    serialNumber.serial = serial.SERIAL;

                    return serialNumber;
                }
            );

            return Promise.resolve(serialNumbers);
        } catch (error) { console.log(error)
            return Promise.reject(error); // FIXME: send a proper error message
        }
    }

    public updateScannedSerialNumberToProcess(
        request: DataRequest.UpdateScannedSerialNumberToProcess
    ): Promise<DataResponse.Operation> {
        return this.api.updateScannedSerialNumberToProcess(request);
    }

    public rollbackSerialNumbersOnProcess(
        request: DataRequest.RollbackSerialNumbersOnProcess
    ): Promise<DataResponse.Operation> {
        return this.api.rollbackSerialNumbersOnProcess(request);
    }

    public updateSetActiveSerialNumber(
        request: DataRequest.UpdateSetActiveSerialNumber
    ): Promise<DataResponse.Operation> {
        return this.api.updateSetActiveSerialNumber(request);
    }

    public ValidateIfPickingLicenseIsAvailable(
        request: DataRequest.ValidateIfPickingLicenseIsAvailable
    ): Promise<
        Array<DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE>
    > {
        return this.api.validateIfPickingLicenseIsAvailable(request);
    }

    public registerGeneralDispatch(
        request: DataRequest.RegisterGeneralDispatch
    ): Promise<DataResponse.Operation> {
        return this.api.registerGeneralDispatch(request);
    }

    public updateLocationTargetTask(
        request: DataRequest.UpdateLocationTargetTask
    ): Promise<DataResponse.Operation> {
        return this.api.updateLocationTargetTask(request);
    }

    public getPickingMaterialsWithMeasurementUnit(
        request: DataRequest.GetPickingMaterialsWithMeasurementUnit
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
        >
    > {
        return this.api.getPickingMaterialsWithMeasurementUnit(request);
    }

    public getLastDispatchLicenseGeneratedByWavePicking(
        request: DataRequest.GetLastDispatchLicenseGeneratedByWavePicking
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_LAST_DISPATCH_LICENSE_GENERATED_BY_WAVE_PICKING
        >
    > {
        return this.api.getLastDispatchLicenseGeneratedByWavePicking(request);
    }

    public insertLicenseDispatch(
        request: DataRequest.InsertLicenseDispatch
    ): Promise<DataResponse.Operation> {
        return this.api.insertLicenseDispatch(request);
    }

    public registerGeneralDispatchByRegimeGeneral(
        request: DataRequest.RegisterGeneralDispatchByRegimeGeneral
    ): Promise<DataResponse.Operation> {
        return this.api.registerGeneralDispatchByRegimeGeneral(request);
    }

    public getLicenseDispatchByWavePicking(
        request: DataRequest.GetLicenseDispatchByWavePicking
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_BY_WAVE_PICKING>
    > {
        return this.api.getLicenseDispatchByWavePicking(request);
    }

    public getTargetLocationByLicenseDispatch(
        request: DataRequest.GetTargetLocationByLicenseDispatch
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_TARGET_LOCATION_BY_LICENSE_DISPATCH>
    > {
        return this.api.getTargetLocationByLicenseDispatch(request);
    }

    public locateLicenseDispatch(
        request: DataRequest.LocateLicenseDispatch
    ): Promise<DataResponse.Operation> {
        return this.api.locateLicenseDispatch(request);
    }

    public registerForRePlenishment(
        request: DataRequest.RegisterForReplenishment
    ): Promise<DataResponse.Operation> {
        return this.api.registerForReplenishment(request);
    }

    public registerRePlenishment(
        request: DataRequest.RegisterReplenishment
    ): Promise<DataResponse.Operation> {
        return this.api.registerReplenishment(request);
    }

    public getWavePickingForLicenseDispatch(
        request: DataRequest.GetWavePickingForLicenseDispatch
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH>
    > {
        return this.api.getWavePickingForLicenseDispatch(request);
    }

    public getLicenseDispatchForPicking(
        request: DataRequest.GetLicenseDispatchForPicking
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING>> {
        return this.api.getLicenseDispatchForPicking(request);
    }

    public dispatchLicenseExit(
        request: DataRequest.DispatchLicenseExit
    ): Promise<DataResponse.Operation> {
        return this.api.dispatchLicenseExit(request);
    }

    public async getWavePickingPendingToLocate(
        request: DataRequest.GetWavePickingPendingToLocate
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE>
    > {
        return this.api.getWavePickingPendingToLocate(request);
    }

    async completeTask(
        task: Model.Task,
        loginId: string,
        closeTask?: Enums.YesNo
    ): Promise<DataResponse.Operation> {
        try {
            let receptionRequest: DataRequest.Reception = DataRequest.Factory.createReceptionRequest(
                this.settings.userCredentials
            );
            receptionRequest.transType = Enums.TransType.GeneralPicking;
            receptionRequest.loginId = loginId;
            receptionRequest.login = loginId.split("@")[0];
            receptionRequest.policyCode = task.sourcePolicyCode;
            receptionRequest.taskId = task.id;
            receptionRequest.status = Enums.ReceptionStatus.Accepted;
            receptionRequest.completeTask = closeTask || Enums.YesNo.No;
            let result: DataResponse.Operation = await this.reception.recordAndCompleteTheTask(
                receptionRequest
            );
            return Promise.resolve(result);
        } catch (reason) { console.log(reason)
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        reason,
                        Enums.CustomErrorCodes.DataBaseError
                    )
                )
            );
        }
    }

    public async getSuggestedDispatchLicense(
        request: DataRequest.GetSuggestedDispatchLicense
    ): Promise<Array<DataResponse.OP_WMS_GET_SUGGESTED_DISPATCH_LICENSE>> {
        return this.api.getSuggestedDispatchLicense(request);
    }

    public insertPilotFromDispatchLicense(
        request: DataRequest.InsertPilotFromDispatchLicense
    ): Promise<DataResponse.Operation> {
        return this.api.insertPilotFromDispatchLicense(request);
    }

    public insertVehicleFromDispatchLicence(
        request: DataRequest.InsertVehicleFromDispatchLicence
    ): Promise<DataResponse.Operation> {
        return this.api.insertVehicleFromDispatchLicence(request);
    }

    public insertExitPassFromDispatchLicence(
        request: DataRequest.InsertExitPassFromDispatchLicence
    ): Promise<DataResponse.Operation> {
        return this.api.insertExitPassFromDispatchLicence(request);
    }

    public async getWavePickingPendingToDispatch(
        request: DataRequest.GetWavePickingPendingToDispatch
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_DISPATCH>
    > {
        return this.api.getWavePickingPendingToDispatch(request);
    }
}
